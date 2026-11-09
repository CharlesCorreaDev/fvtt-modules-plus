# Complete Guide: Sockets & Cross-Client Communication in Foundry VTT

> **Official Reference:** [https://foundryvtt.com/api/classes/client.Game.html#socket](https://foundryvtt.com/api/classes/client.Game.html#socket)  
> **Ecosystem Standard:** [`socketlib` by Manuel Vögele (ruipin)](https://github.com/ruipin/fvtt-socketlib)

---

## 1. Overview & Architecture
Foundry Virtual Tabletop uses **Socket.io** under the hood (`game.socket`).  
Sockets allow:
1. **Bidirectional Client-Server Messaging:** Send data from a player to the GM, or broadcast from GM to all players.
2. **Elevated Privileges (GM Proxy Pattern):** Non-GM players cannot modify world settings, other players' actors, or certain scene documents. A socket message allows a player client to request the active GM client to execute an action on their behalf with full GM authority.

---

## 2. Native `game.socket` Pattern

### 2.1. Naming & Identification
The core Foundry socket event name is standardized:
`module.<your-module-id>`

```javascript
// scripts/main.mjs
const SOCKET_EVENT = "module.my-enhancement-module";

Hooks.once("ready", () => {
  game.socket.on(SOCKET_EVENT, (payload) => {
    handleSocketMessage(payload);
  });
});

function handleSocketMessage(payload) {
  const { action, data, senderId } = payload;

  switch (action) {
    case "requestActorUpdate":
      // Verify if current client is GM before performing privileged write
      if (!game.user.isGM) return;
      handlePrivilegedActorUpdate(data);
      break;

    case "showNotification":
      ui.notifications.info(`${data.userName}: ${data.message}`);
      break;

    default:
      console.warn("MyModule | Unknown socket action:", action);
  }
}
```

### 2.2. Emitting Events
```javascript
// Broadcast to all clients (including yourself)
game.socket.emit(SOCKET_EVENT, {
  action: "showNotification",
  data: { userName: game.user.name, message: "Rolled on wild magic!" },
  senderId: game.user.id
});
```

> [!WARNING]
> Native `game.socket.emit` broadcasts to **all OTHER clients**, but **NOT** to the emitting client itself. If the sender also needs to execute the logic, call your local handler directly.

---

## 3. High-Level RPC with `socketlib` (Recommended Standard)
`socketlib` simplifies cross-client remote procedure calls (RPC) into typed async promises with built-in GM targeting and authentication.

### 3.1. Registering with `socketlib`
Declare dependency in `module.json`:
```json
"relationships": {
  "requires": [
    {
      "id": "socketlib",
      "type": "module",
      "manifest": "https://github.com/ruipin/fvtt-socketlib/releases/latest/download/module.json"
    }
  ]
}
```

### 3.2. Script Setup (`scripts/main.mjs`)
```javascript
let socket;

Hooks.once("socketlib.ready", () => {
  socket = socketlib.registerModule("my-enhancement-module");

  // Register functions that can be invoked remotely
  socket.register("gmApplyDamage", applyDamageAsGM);
  socket.register("showPopup", displayAlertMessage);
});

// Privileged function executed on the GM's machine
async function applyDamageAsGM(actorUuid, damageAmount) {
  const actor = await fromUuid(actorUuid);
  if (!actor) return;
  const currentHP = actor.system.attributes.hp.value;
  await actor.update({ "system.attributes.hp.value": Math.max(0, currentHP - damageAmount) });
  return { success: true, remainingHP: actor.system.attributes.hp.value };
}

function displayAlertMessage(text) {
  ui.notifications.warn(text);
}
```

### 3.3. Calling Functions from Any Client
```javascript
// 1. Execute on the GM client and await result
const result = await socket.executeAsGM("gmApplyDamage", targetActor.uuid, 15);
console.log("GM Updated Actor:", result);

// 2. Execute on all connected clients
socket.executeForEveryone("showPopup", "A dragon enters the battlefield!");

// 3. Execute on a specific user's client
socket.executeForUsers("showPopup", [targetUserId], "It is your turn to act!");
```

---

## 4. Security & Validation Rules for AI Agents
When generating socket code:
1. **Never Trust Incoming Client Payloads:** Always validate permissions on the receiving side:
   ```javascript
   if (!game.user.isGM) {
     console.error("Unauthorized socket invocation attempt.");
     return;
   }
   ```
2. **Sanitize Data:** Ensure input IDs exist via `fromUuid(uuid)` or `game.actors.get(id)` before updating.
3. **Guard Against Infinite Loops:** Never emit a socket event inside the handler that reacts to that same event.
