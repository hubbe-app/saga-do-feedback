'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { ActionCallback, ActionName, AxisCallback, InputMapper, InputMapperConfig } from './gamepad';


const inputMapper = typeof window !== 'undefined' ? new InputMapper(window) : null;

export const actionMap: InputMapperConfig = {
  actions: {
    [ActionName.Confirm]: {
      keyboard: ['Enter', 'Space'],
      gamepad: [0],
    },
    [ActionName.Cancel]: {
      keyboard: ['Escape'],
      gamepad: [1],
    },
    [ActionName.MoveUp]: {
      keyboard: ['ArrowUp', 'W'],
      gamepad: [12],
    },
    [ActionName.MoveDown]: {
      keyboard: ['ArrowDown', 'S'],
      gamepad: [13],
    },
    [ActionName.MoveLeft]: {
      keyboard: ['ArrowLeft', 'A'],
      gamepad: [14],
    },
    [ActionName.MoveRight]: {
      keyboard: ['ArrowRight', 'D'],
      gamepad: [15],
    },
    [ActionName.Jump]: {
      keyboard: ['Space'],
      gamepad: [2],
    },
    [ActionName.Run]: {
      keyboard: ['Shift'],
      gamepad: [3],
    },
    [ActionName.Attack]: {
      keyboard: ['F'],
      gamepad: [4],
    },
    [ActionName.Block]: {
      keyboard: ['G'],
      gamepad: [5],
    },
    [ActionName.Interact]: {
      keyboard: ['E'],
      gamepad: [6],
    },
    [ActionName.Pause]: {
      keyboard: ['P'],
      gamepad: [7],
    },
    [ActionName.Inventory]: {
      keyboard: ['I'],
      gamepad: [8],
    },
    [ActionName.Map]: {
      keyboard: ['M'],
      gamepad: [9],
    },
    [ActionName.SpecialMove1]: {
      keyboard: ['1'],
      gamepad: [10],
    },
    [ActionName.SpecialMove2]: {
      keyboard: ['2'],
      gamepad: [11],
    },
    [ActionName.SpecialMove3]: {
      keyboard: ['3'],
      gamepad: [],
    },
    [ActionName.Option1]: {
      keyboard: ['4'],
      gamepad: [],
    },
    [ActionName.Option2]: {
      keyboard: ['5'],
      gamepad: [],
    },
    [ActionName.Option3]: {
      keyboard: ['6'],
      gamepad: [],
    },
    [ActionName.ButtonY]: {
      keyboard: ['Y'],
      gamepad: [3],
    },
    [ActionName.ButtonX]: {
      keyboard: ['X'],
      gamepad: [2],
    },
    [ActionName.ButtonB]: {
      keyboard: ['B'],
      gamepad: [1],
    },
  },
};
if (typeof window !== 'undefined') {
  inputMapper?.loadConfiguration(actionMap);
}

export const useKeyPress = (filterKeys?: string[]): Set<string> => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  const downHandler = ({ key }: KeyboardEvent) => {
    if (!filterKeys || filterKeys.includes(key)) {
      setPressedKeys((prevKeys) => new Set(prevKeys).add(key));
    }
  };

  const upHandler = ({ key }: KeyboardEvent) => {
    if (!filterKeys || filterKeys.includes(key)) {
      setPressedKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(key);
        return newKeys;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [filterKeys]); // Dependency on filterKeys

  return pressedKeys;
};

export const useKeyUp = (filterKeys?: string[]): Set<string> => {
  const [releasedKeys, setReleasedKeys] = useState<Set<string>>(new Set());

  // Handler for key up events
  const upHandler = ({ key }: KeyboardEvent) => {
    if (!filterKeys || filterKeys.includes(key)) {
      setReleasedKeys((prevKeys) => new Set(prevKeys).add(key));
      // Optionally, you can set a timeout to remove the key from the set after a short period
      setTimeout(() => {
        setReleasedKeys((prevKeys) => {
          const newKeys = new Set(prevKeys);
          newKeys.delete(key);
          return newKeys;
        });
      }, 1000 / 60); // 100ms delay to clear the key
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [filterKeys]); // Dependency on filterKeys

  return releasedKeys;
};

export const useKeysPressEffect = (keys: string[], callback: (index: number) => void) => {
  const pressedKeys = useKeyPress(keys);
  useEffect(() => {
    keys.forEach((key, index) => {
      if (pressedKeys.has(key)) {
        callback(index);
      }
    });
  }, [pressedKeys]);
};

export const useKeyUpEffect = (key: string, callback: () => void) => {
  const releasedKeys = useKeyUp([key]);
  useEffect(() => {
    if (releasedKeys.has(key)) {
      callback();
    }
  }, [releasedKeys]);
};

export const useActionEffect = (action: ActionName, callback: ActionCallback, deps: any[] = []) => {
  useEffect(() => {
    
    inputMapper?.setActionCallback(action, callback);
    return () => inputMapper?.removeActionCallback(action);
  }, deps);
};

export const useComboEffect = (actions: ActionName[], callback: ActionCallback, deps: any[] = []) => {
  useEffect(() => {
    actions.forEach((action) => {
      inputMapper?.setActionCallback(action, callback);
    });

    return () =>
      actions.forEach((action) => {
        inputMapper?.removeActionCallback(action);
      });
  }, deps);
};

export const useAxisEffect = (axis: number[], callback: AxisCallback) => {
  useEffect(() => {
    axis.forEach((axisIndex) => {
      inputMapper?.setAxisCallback(axisIndex, callback);
    });
    return () => inputMapper?.removeAxisCallback(axis);
  }, [axis]);
};

export const usePressure = (horizontalKeys: string[] = [], verticalKeys: string[] = []): number => {
  const pressedKeys = useKeyPress(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);
  let pressure = 0;
  if (pressedKeys.has('ArrowUp') && verticalKeys.includes('ArrowUp')) {
    pressure += 1;
  }
  if (pressedKeys.has('ArrowDown') && verticalKeys.includes('ArrowDown')) {
    pressure -= 1;
  }
  if (pressedKeys.has('ArrowLeft') && horizontalKeys.includes('ArrowLeft')) {
    pressure -= 1;
  }
  if (pressedKeys.has('ArrowRight') && horizontalKeys.includes('ArrowRight')) {
    pressure += 1;
  }
  return pressure;
};

export const DebugKeyPress: React.FC = () => {
  const pressedKeys = useKeyPress();
  return (
    <div>
      <div>DebugKeyPress: </div>
      <ul>
        {/* @ts-ignore */}
        {[...pressedKeys].map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </div>
  );
};

export const DebugKeyUp: React.FC = () => {
  const pressedKeys = useKeyUp();
  return (
    <div>
      <div>DebugKeyUp: </div>
      <ul>
        {/* @ts-ignore */}
        {[...pressedKeys].map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </div>
  );
};

export const DebugAxis: React.FC = () => {
  const [axis, setAxis] = useState<number[]>([0.0, 0.0, 0.0, 0.0]);

  useAxisEffect([0, 1, 2, 3], (index, value) => {
    setAxis((prevAxis) => {
      const newAxis = [...prevAxis];
      newAxis[index] = value;
      return newAxis;
    });
  });

  return (
    <div>
      <div>DebugAxis: </div>
      <ul>
        {[...axis].map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};
