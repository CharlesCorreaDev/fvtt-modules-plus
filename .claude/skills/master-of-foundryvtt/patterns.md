# Foundry VTT - Architectural Patterns

## 🇺🇸 English
### 1. DataModel Schema Pattern (v10, v11, v12, v13, v14)
```javascript
const { StringField, NumberField, SchemaField, ArrayField } = foundry.data.fields;

export class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      biography: new StringField({ required: true, blank: true }),
      attributes: new SchemaField({
        level: new NumberField({ required: true, integer: true, min: 1, initial: 1 }),
        hp: new SchemaField({
          value: new NumberField({ required: true, integer: true, min: 0, initial: 10 }),
          max: new NumberField({ required: true, integer: true, min: 0, initial: 10 })
        })
      })
    };
  }
}
```

### 2. ApplicationV2 Standard Pattern (v12+)
```javascript
const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class CustomDashboardApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: 'custom-dashboard',
    tag: 'form',
    window: { title: 'Custom Dashboard V12' },
    position: { width: 520, height: 'auto' }
  };
  
  static PARTS = {
    form: {
      template: 'modules/my-module/templates/dashboard.hbs'
    }
  };
}
```
