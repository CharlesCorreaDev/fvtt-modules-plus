# Foundry Virtual Tabletop - API Documentation (Version 8)

> **Official URL:** [https://foundryvtt.com/api/v8/](https://foundryvtt.com/api/v8/)  
> **Source:** Foundry Gaming LLC Client-Side API Documentation - Version 8

---

## 📌 Overview & Scope
Welcome to the comprehensive technical documentation for the client-side API of **Foundry Virtual Tabletop Version 8**.
This documentation details core document hierarchies, database operations, the canvas WebGL rendering engine, user interfaces, data models, dice evaluation, and major platform components.

---

### 

# Foundry Virtual Tabletop API Documentation

Welcome to the documentation for the client-side API of Foundry Virtual Tabletop, a JavaScript application for running tabletop role-playing games within a self-hosted web framework. The goal of this documentation is to empower developers to create amazing game systems, add-on modules, and scripts which augment and extend the base functionality of the Foundry Virtual Tabletop platform.

## Table of Contents

- Documents and Data

Document Abstraction
Database Operations
Collections
Primary Document Types

Actor
Chat Message
Combat Encounter
Item
Fog Exploration
Folder
Journal Entry
Macro
Playlist
Rollable Table
Scene
Setting
User

Embedded Document Types

Active Effect
Combatant
Playlist Sound
Table Result
Ambient Light
Ambient Sound
Drawing
Measured Template
Note
Tile
Token
Wall
- The Game Canvas

Canvas Building Blocks
Canvas Layers
Canvas Objects
HUD Overlay
- User Interface

Application Building Blocks
- Dice Rolling

Roll Term Types
Dice Types
- Other Major Components

Audio and Video
Game Management
Video and Voice Chat
Interactivity

- Document Abstraction
- Database Operations
- Collections
- Primary Document Types

Actor
Chat Message
Combat Encounter
Item
Fog Exploration
Folder
Journal Entry
Macro
Playlist
Rollable Table
Scene
Setting
User
- Embedded Document Types

Active Effect
Combatant
Playlist Sound
Table Result
Ambient Light
Ambient Sound
Drawing
Measured Template
Note
Tile
Token
Wall

- Actor
- Chat Message
- Combat Encounter
- Item
- Fog Exploration
- Folder
- Journal Entry
- Macro
- Playlist
- Rollable Table
- Scene
- Setting
- User

- Active Effect
- Combatant
- Playlist Sound
- Table Result
- Ambient Light
- Ambient Sound
- Drawing
- Measured Template
- Note
- Tile
- Token
- Wall

- Canvas Building Blocks
- Canvas Layers
- Canvas Objects
- HUD Overlay

- Application Building Blocks

- Roll Term Types
- Dice Types

- Audio and Video
- Game Management
- Video and Voice Chat
- Interactivity

# Documents and Data

Data in Foundry Virtual Tabletop is organized around the concept of Documents. Each document represents a single coherent piece of data which represents a specific object within the framework. The term Document refers to both the definition of a specific type of data (the Document class) as well as a uniquely identified instance of that data type (an instance of that class).

## Document Abstraction

- Document - The abstract base class shared by both client and server-side which defines the model for a single document type.
- DocumentData - The abstract base class which defines the data schema contained within a Document.
- ClientDocumentMixin - A mixin which extends each Document definition with specialized client-side behaviors.

## Database Operations

- DatabaseBackend - An interface shared by both the client and server-side which defines how creation, update, and deletion operations are transacted.
- ClientDatabaseBackend - An implementation of the abstract backend which performs client-side CRUD operations.

## Collections

- DocumentCollection - An abstract subclass of the Collection container which defines a collection of Document instances.
- WorldCollection - A collection of world-level Document objects with a singleton instance per primary Document type.
- CompendiumCollection - A collection of Document objects contained within a specific compendium pack.

## Primary Document Types

There are 11 primary Document types, each of which is saved to its own database table with within the active World.

### Actor

- ActorData - The data schema for an Actor document.
- BaseActor - The base Actor model definition which defines common behavior of an Actor document between both client and server.
- Actor - The client-side Actor document which extends the common BaseActor model.
- Actors - The singleton collection of Actor documents which exist within the active World.
- ActorSheet - The Application responsible for displaying and editing a single Actor document.
- ActorDirectory - The sidebar directory which organizes and displays world-level Actor documents.

### Chat Message

- ChatMessageData - The data schema for a ChatMessage document.
- BaseChatMessage - The base ChatMessage model definition which defines common behavior of an ChatMessage document between both client and server.
- ChatMessage - The client-side ChatMessage document which extends the common BaseChatMessage model.
- Messages - The singleton collection of ChatMessage documents which exist within the active World.
- ChatLog - The sidebar directory which organizes and displays world-level ChatMessage documents.

### Combat Encounter

- CombatData - The data schema for a Combat document.
- BaseCombat - The base Combat model definition which defines common behavior of an Combat document between both client and server.
- Combat - The client-side Combat document which extends the common BaseCombat model.
- CombatEncounters - The singleton collection of Combat documents which exist within the active World.
- CombatTracker - The sidebar directory which organizes and displays world-level Combat documents.
- CombatTracker - The Application responsible for configuring the CombatTracker and its contents.

### Item

- ItemData - The data schema for a Item document.
- BaseItem - The base Item model definition which defines common behavior of an Item document between both client and server.
- Item - The client-side Item document which extends the common BaseItem model.
- Items - The singleton collection of Item documents which exist within the active World.
- ItemSheet - The Application responsible for displaying and editing a single Item document.
- ItemDirectory - The sidebar directory which organizes and displays world-level Item documents.

### Fog Exploration

- FogExplorationData - The data schema for a FogExploration document.
- BaseFogExploration - The base FogExploration model definition which defines common behavior of an FogExploration document between both client and server.
- FogExploration - The client-side FogExploration document which extends the common BaseFogExploration model.
- FogExplorations - The singleton collection of FogExploration documents which exist within the active World.

### Folder

- FolderData - The data schema for a Folder document.
- BaseFolder - The base Folder model definition which defines common behavior of an Folder document between both client and server.
- Folder - The client-side Folder document which extends the common BaseFolder model.
- Folders - The singleton collection of Folder documents which exist within the active World.
- FolderConfig - The Application responsible for configuring a single Folder document.

### Journal Entry

- JournalEntryData - The data schema for a JournalEntry document.
- BaseJournalEntry - The base JournalEntry model definition which defines common behavior of an JournalEntry document between both client and server.
- JournalEntry - The client-side JournalEntry document which extends the common BaseJournalEntry model.
- Journal - The singleton collection of JournalEntry documents which exist within the active World.
- JournalSheet - The Application responsible for displaying and editing a single JournalEntry document.
- JournalDirectory - The sidebar directory which organizes and displays world-level JournalEntry documents.

### Macro

- MacroData - The data schema for a MacroData document.
- BaseMacro - The base Macro model definition which defines common behavior of an Macro document between both client and server.
- Macro - The client-side Macro document which extends the common BaseMacro model.
- Macros - The singleton collection of Macro documents which exist within the active World.
- MacroConfig - The Application responsible for displaying and editing a single Macro document.
- MacroDirectory - The directory, not displayed in the sidebar, which organizes and displays world-level Macro documents.

### Playlist

- PlaylistData - The data schema for a Playlist document.
- BasePlaylist - The base Playlist model definition which defines common behavior of an Playlist document between both client and server.
- Playlist - The client-side Playlist document which extends the common BasePlaylist model.
- Playlists - The singleton collection of Playlist documents which exist within the active World.
- PlaylistConfig - The Application responsible for configuring a single Playlist document.
- PlaylistDirectory - The sidebar directory which organizes and displays world-level Playlist documents.

### Rollable Table

- RollTableData - The data schema for a RollTableData document.
- BaseRollTable - The base RollTable model definition which defines common behavior of an RollTable document between both client and server.
- RollTable - The client-side RollTable document which extends the common BaseRollTable model.
- RollTables - The singleton collection of RollTable documents which exist within the active World.
- RollTableConfig - The Application responsible for displaying and editing a single RollTable document.
- RollTableDirectory - The sidebar directory which organizes and displays world-level RollTable documents.

### Scene

- SceneData - The data schema for a Scene document.
- BaseScene - The base Scene model definition which defines common behavior of an Scene document between both client and server.
- Scene - The client-side Scene document which extends the common BaseScene model.
- Scenes - The singleton collection of Scene documents which exist within the active World.
- SceneConfig - The Application responsible for configuring a single Scene document.
- SceneDirectory - The sidebar directory which organizes and displays world-level Scene documents.
- SceneNavigation - The UI element which displays the Scene documents which are currently enabled for quick navigation.

### Setting

- SettingData - The data schema for a Setting document.
- BaseSetting - The base Setting model definition which defines common behavior of an Setting document between both client and server.
- ClientSettings - A class responsible for managing defined game settings or settings menus.
- Settings - The sidebar tab which displays various game settings, help messages, and configuration options.
- SettingConfig - The Application responsible for displaying and configuring registered game Setting documents.

### User

- UserData - The data schema for a User document.
- BaseUser - The base User model definition which defines common behavior of an User document between both client and server.
- User - The client-side User document which extends the common BaseUser model.
- Users - The singleton collection of User documents which exist within the active World.
- UserConfig - The Application responsible for configuring a single User document.
- PlayerList - The UI element which displays the list of Users who are currently playing within the active World.

## Embedded Document Types

In addition to the above primary document types, each of which are indexed within their own tables, there are several additional document types which only exist as embedded documents within a parent Document. These embedded documents cannot exist on their own (outside of the context of a parent).

### Active Effect

- ActiveEffectData - The data schema for an ActiveEffect document.
- BaseActiveEffect - The base ActiveEffect model definition which defines common behavior of an ActiveEffect document between both client and server.
- ActiveEffect - The client-side ActiveEffect document which extends the common BaseActiveEffect model.
- ActiveEffectConfig - The Application responsible for configuring a single ActiveEffect document within a parent Actor or Item.

### Combatant

- CombatantData - The data schema for a Combatant document.
- BaseCombatant - The base Combatant model definition which defines common behavior of an Combatant document between both client and server.
- Combatant - The client-side Combatant document which extends the common BaseCombatant model.
- CombatantConfig - The Application responsible for configuring a single Combatant document within a parent Combat.

### Playlist Sound

- PlaylistSoundData - The data schema for a PlaylistSound document.
- BasePlaylistSound - The base PlaylistSound model definition which defines common behavior of an PlaylistSound document between both client and server.
- PlaylistSound - The client-side PlaylistSound document which extends the common BasePlaylistSound model.
- PlaylistSoundConfig - The Application responsible for configuring a single PlaylistSound document within a parent Playlist.

### Table Result

- TableResultData - The data schema for a TableResult document.
- BaseTableResult - The base TableResult model definition which defines common behavior of an TableResult document between both client and server.
- TableResult - The client-side TableResult document which extends the common BaseTableResult model.

### Ambient Light

- AmbientLightData - The data schema for a AmbientLight document.
- BaseAmbientLight - The base AmbientLight model definition which defines common behavior of an AmbientLight document between both client and server.
- AmbientLightDocument - The client-side AmbientLight document which extends the common BaseAmbientLight model.
- LightConfig - The Application responsible for configuring a single AmbientLight document within a parent Scene.

### Ambient Sound

- AmbientSoundData - The data schema for a AmbientSound document.
- BaseAmbientSound - The base AmbientSound model definition which defines common behavior of an AmbientSound document between both client and server.
- AmbientSoundDocument - The client-side AmbientSound document which extends the common BaseAmbientSound model.
- AmbientSoundConfig - The Application responsible for configuring a single AmbientSound document within a parent Scene.

### Drawing

- DrawingData - The data schema for a Drawing document.
- BaseDrawing - The base Drawing model definition which defines common behavior of an Drawing document between both client and server.
- DrawingDocument - The client-side Drawing document which extends the common BaseDrawing model.
- DrawingConfig - The Application responsible for configuring a single Drawing document within a parent Scene.

### Measured Template

- MeasuredTemplateData - The data schema for a MeasuredTemplate document.
- BaseMeasuredTemplate - The base MeasuredTemplate model definition which defines common behavior of an MeasuredTemplate document between both client and server.
- MeasuredTemplateDocument - The client-side MeasuredTemplate document which extends the common BaseMeasuredTemplate model.
- MeasuredTemplateConfig - The Application responsible for configuring a single MeasuredTemplate document within a parent Scene.

### Note

- NoteData - The data schema for a Note document.
- BaseNote - The base Note model definition which defines common behavior of an Note document between both client and server.
- NoteDocument - The client-side Note document which extends the common BaseNote model.
- NoteConfig - The Application responsible for configuring a single Note document within a parent Scene.

### Tile

- TileData - The data schema for a Tile document.
- BaseTile - The base Tile model definition which defines common behavior of an Tile document between both client and server.
- TileDocument - The client-side Tile document which extends the common BaseTile model.
- TileConfig - The Application responsible for configuring a single Tile document within a parent Scene.

### Token

- TokenData - The data schema for a Token document.
- BaseToken - The base Token model definition which defines common behavior of an Token document between both client and server.
- TokenDocument - The client-side Token document which extends the common BaseToken model.
- TokenConfig - The Application responsible for configuring a single Token document within a parent Scene.

### Wall

- WallData - The data schema for a Wall document.
- BaseWall - The base Wall model definition which defines common behavior of an Wall document between both client and server.
- WallDocument - The client-side Wall document which extends the common BaseWall model.
- WallConfig - The Application responsible for configuring a single Wall document within a parent Scene.

# The Game Canvas

The visual game surface in Foundry Virtual Tabletop is managed by a WebGL-powered canvas which uses the PixiJS library.

## Canvas Building Blocks

The game canvas is constructed using several core building blocks.

- Canvas - The master controller of the canvas element upon which the tabletop is rendered.
- CanvasLayer - An abstract pattern for primary layers of the game canvas to implement.
- PlaceablesLayer - A subclass of Canvas Layer which is specifically designed to contain multiple PlaceableObject instances, each corresponding to an embedded Document.
- CanvasDocumentMixin - A specialized sub-class of the ClientDocumentMixin which is used for document types that are intended to be represented upon the game Canvas.
- PlaceableObject
- CanvasAnimation

## Canvas Layers

The Canvas is composed of multiple layers which are ordered from bottom-most to top-most according to the list below. Each layer is an implementation of the CanvasLayer (or PlaceablesLayer) class.

- BackgroundLayer
- TilesLayer
- DrawingsLayer
- GridLayer
- TemplatesLayer
- WallsLayer
- NotesLayer
- TokensLayer
- LightingLayer
- SightLayer
- SoundsLayer
- EffectsLayer
- ControlsLayer

## Canvas Objects

Canvas layers contain PlaceableObject instances which are rendered within that layer. The following are the available object types which may be placed.

- AmbientLight
- AmbientSound
- Drawing
- MeasuredTemplate
- Tile
- Token
- Note
- Wall

## HUD Overlay

In addition to WebGL canvas layers, there is also support for HTML-based canvas overlay known as "HUD" objects.

- Drawing HUD
- Tile HUD
- Token HUD

# User Interface

In addition to the underlying data and the visual representation of that data on the Canvas, Foundry VTT renders many HTML Applications which represent modular interface components for browsing, editing, or configuring elements of the virtual tabletop.

## Application Building Blocks

The following classes provide high-level building blocks for defining HTML applications within Foundry Virtual Tabletop.

- Application
- FormApplication
- DocumentSheet
- Dialog
- ContextMenu
- FilePicker
- Tabs
- TextEditor
- DragDrop

# Dice Rolling

As a developer, you may often want to trigger dice rolls or customize the behavior of dice rolling. Foundry Virtual Tabletop provides a set of API concepts dedicated towards working with dice.

- Roll - An interface and API for constructing and evaluating dice rolls.
- RollTerm - An abstract class which represents a single token that can be used as part of a Roll formula.
- MersenneTwister - A standalone, pure JavaScript implementation of the Mersenne Twister pseudo random number generator.

## Roll Term Types

- DiceTerm - An abstract base class for any type of RollTerm which involves randomized input from dice, coins, or other devices.
- MathTerm - A type of RollTerm used to apply a function from the Math library.
- NumericTerm - A type of RollTerm used to represent static numbers.
- OperatorTerm - A type of RollTerm used to denote and perform an arithmetic operation.
- ParentheticalTerm - A type of RollTerm used to enclose a parenthetical expression to be recursively evaluated.
- PoolTerm - A type of RollTerm which encloses a pool of multiple inner Rolls which are evaluated jointly.
- StringTerm - A type of RollTerm used to represent strings which have not yet been matched.

## Dice Types

- Die - A type of DiceTerm used to represent rolling a fair n-sided die.
- Coin - A type of DiceTerm used to represent flipping a two-sided coin.
- FateDie - A type of DiceTerm used to represent a three-sided Fate/Fudge die.

# Other Major Components

In addition to the outlined structure above, there are many additional miscellaneous elements of the Foundry Virtual Tabletop API for you to explore. Please browse the sidebar for a complete listing of classes and functions. Some specific classes which are noteworthy or commonly used include:

## Audio and Video

- AudioHelper - Utilities for working with Audio files.
- ImageHelper - Utilities for working with Image files.
- Sound - The Sound class is used to control the playback of audio sources using the Web Audio API.
- VideoHelper - Utilities for working with Video files.

## Game Management

- Game - The master controller for the active game instance
- GameTime - A singleton class which keeps the official Server and World time stamps.

## Video and Voice Chat

- AVMaster - The master Audio/Video controller instance.
- AVClient - An interface for an Audio/Video client which is extended to provide broadcasting functionality.
- SimplePeerAVClient - An implementation of the AVClient which uses the simple-peer library and the Foundry socket server for signaling.

## Interactivity

- Hooks - An infrastructure for registering event handlers which fire under specific conditions.
- KeyboardManager - A set of helpers and management functions for dealing with user input from keyboard events.
- SocketInterface - Helper functions for dispatching and receiving socket events in a standardized way.

---

## 🔗 Official Reference & Links
- **API Reference:** [https://foundryvtt.com/api/v8/](https://foundryvtt.com/api/v8/)
- **Knowledge Base:** [https://foundryvtt.com/kb/](https://foundryvtt.com/kb/)
- **Release Notes:** [https://foundryvtt.com/releases/](https://foundryvtt.com/releases/)
