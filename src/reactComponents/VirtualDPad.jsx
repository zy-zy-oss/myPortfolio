import { useAtom, useAtomValue } from "jotai";
import { areTouchControlsEnabledAtom, DPadInputAtom } from "../state";

export function VirtualDPad() {
  const areTouchControlsEnabled = useAtomValue(areTouchControlsEnabledAtom);
  const [DPadInput, setDpadInput] = useAtom(DPadInputAtom);

  return (
    areTouchControlsEnabled && (
      <div className="dpad">
        <button
          className="up"
          onMouseDown={() => {
            DPadInput.isUpPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isUpPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          Up
        </button>
        <button
          className="down"
          onMouseDown={() => {
            DPadInput.isDownPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isDownPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          Down
        </button>
        <button
          className="left"
          onMouseDown={() => {
            DPadInput.isLeftPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isLeftPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          Left
        </button>
        <button
          className="right"
          onMouseDown={() => {
            DPadInput.isRightPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isRightPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          Right
        </button>
      </div>
    )
  );
}
