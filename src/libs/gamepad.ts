'use client';

export class GamepadButtonDownEvent extends Event {
   public gamepadIndex: number;
   public buttonIndex: number;

   constructor(gamepadIndex: number, buttonIndex: number) {
       super("gamepadbuttondown");
       this.gamepadIndex = gamepadIndex;
       this.buttonIndex = buttonIndex;
   }
}

export class GamepadButtonUpEvent extends Event {
   public gamepadIndex: number;
   public buttonIndex: number;

   constructor(gamepadIndex: number, buttonIndex: number) {
       super("gamepadbuttonup");
       this.gamepadIndex = gamepadIndex;
       this.buttonIndex = buttonIndex;
   }
}

class GamepadAxisEvent extends Event {
   public gamepadIndex: number;
   public axisIndex: number;
   public value: number;

   constructor(gamepadIndex: number, axisIndex: number, value: number) {
      super("gamepadaxis");
      this.gamepadIndex = gamepadIndex;
      this.axisIndex = axisIndex;
      this.value = value;
   }
}

export type ActionCallback = () => void;

export type AxisCallback = (index: number, value: number) => void;

export enum ActionName {
   Confirm,
   Cancel,
   MoveUp,
   MoveDown,
   MoveLeft,
   MoveRight,
   Jump,
   Run,
   Attack,
   Block,
   Interact,
   Pause,
   Inventory,
   Map,
   SpecialMove1,
   SpecialMove2,
   SpecialMove3,
   Option1,
   Option2,
   Option3
   // Add other common actions as needed
}

class GamepadHandler {

   private gamepads: { [index: number]: Gamepad } = {};
   private previousButtonStates: { [gamepadIndex: number]: boolean[] } = {};
   private stickThreshold = 0.5;

   constructor(private window: Window) {
      this.window.addEventListener('gamepadconnected', (e: GamepadEvent) => this.onGamepadConnected(e));
      this.window.addEventListener('gamepaddisconnected', (e: GamepadEvent) => this.onGamepadDisconnected(e));

      this.pollGamepads();
   }

   private onGamepadConnected(event: GamepadEvent): void {
      this.gamepads[event.gamepad.index] = event.gamepad;
   }

   private onGamepadDisconnected(event: GamepadEvent): void {
      delete this.gamepads[event.gamepad.index];
   }

   private pollGamepads(): void {
      const connectedGamepads = navigator.getGamepads ? navigator.getGamepads() : [];

      for (const gamepad of connectedGamepads) {
         if (gamepad) {
            this.processGamepadInput(gamepad);
            this.processGamepadSticks(gamepad);
         }
      }

      requestAnimationFrame(() => this.pollGamepads());
   }

   private processGamepadInput(gamepad: Gamepad): void {
      const previousStates = this.previousButtonStates[gamepad.index] || [];
      
      gamepad.buttons.forEach((button, index) => {
          const wasPressed = previousStates[index] || false;
          const isPressed = button.pressed;

          if (isPressed && !wasPressed) {
              const event = new GamepadButtonDownEvent(gamepad.index, index);
              window.dispatchEvent(event);
          } else if (!isPressed && wasPressed) {
              const event = new GamepadButtonUpEvent(gamepad.index, index);
              window.dispatchEvent(event);
          }

          previousStates[index] = isPressed;
      });

      this.previousButtonStates[gamepad.index] = previousStates;
  }

   private processGamepadSticks(gamepad: Gamepad): void {
      gamepad.axes.forEach((axis, index) => {
         if (Math.abs(axis) > this.stickThreshold) {
            const event = new GamepadAxisEvent(gamepad.index, index, axis);
            window.dispatchEvent(event);
         }
      });
   }
}

export class InputMapper {
   private keyActionMap: Map<string, ActionName>;
   private buttonActionMap: Map<number, ActionName>;
   private actionCallbacks: Map<ActionName, ActionCallback>;
   private axisCallbacks: Map<number, AxisCallback>;
   private gamepadHandler: GamepadHandler;

   constructor(private window: Window) {
      this.keyActionMap = new Map();
      this.buttonActionMap = new Map();
      this.axisCallbacks = new Map();
      
      this.actionCallbacks = new Map();
      this.gamepadHandler = new GamepadHandler(window);

      this.window.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeyInput(e));
      this.window.addEventListener('gamepadbuttonup', (e: GamepadButtonUpEvent) => this.handleGamepadInput(e));
      this.window.addEventListener('gamepadaxis', (e: GamepadAxisEvent) => this.handleGamepadAxis(e));
   }

   public mapKeyToAction(keyCode: string, action: ActionName): void {
      this.keyActionMap.set(keyCode, action);
   }

   public mapButtonToAction(buttonIndex: number, action: ActionName): void {
      this.buttonActionMap.set(buttonIndex, action);
   }

   public setActionCallback(action: ActionName, callback: ActionCallback): void {
      this.actionCallbacks.set(action, callback);
   }

   public removeActionCallback(action: ActionName): void {
      this.actionCallbacks.delete(action);
   }

   public setAxisCallback(axisIndex: number, callback: AxisCallback): void {
      this.axisCallbacks.set(axisIndex, callback);
   }

   public removeAxisCallback(axis: number[]): void {
      axis.forEach(axisIndex => this.axisCallbacks.delete(axisIndex));
   }

   public loadConfiguration(config: InputMapperConfig): void {
      
      for (const action in Object.keys(config.actions)) {
         
         const actionName = action as unknown as ActionName;
         const keyMappings = config.actions[actionName].keyboard;
         const buttonMappings = config.actions[actionName].gamepad;

         keyMappings.forEach((key: string) => this.mapKeyToAction(key, actionName));
         buttonMappings.forEach((buttonIndex: number) => this.mapButtonToAction(buttonIndex, actionName));
      }

   }

   private handleKeyInput(event: KeyboardEvent): void {
      
      const action = this.keyActionMap.get(event.code);
      if (action !== undefined) {
         this.triggerAction(action);
      }
   }

   private handleGamepadInput(event: GamepadButtonUpEvent): void {
      const action = this.buttonActionMap.get(event.buttonIndex);
      if (action !== undefined) {
         this.triggerAction(action);
      }
   }

   private handleGamepadAxis(event: GamepadAxisEvent): void {
      const action = this.axisCallbacks.get(event.axisIndex);
      if (action !== undefined) {
         action(event.axisIndex, event.value);
      }
   }

   private triggerAction(action: ActionName): void {
      const callback = this.actionCallbacks.get(action);
      if (callback) {
         callback();
      }
   }
}

type InputMapperConfig = {
   actions: {
      [action in ActionName]: {
         keyboard: string[];
         gamepad: number[];
      }
   }
}