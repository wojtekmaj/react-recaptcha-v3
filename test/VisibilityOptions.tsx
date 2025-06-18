import { useId } from 'react';

type VisibilityOptionsProps = {
  showInstance1: boolean;
  setShowInstance1: (value: boolean) => void;
  showInstance2: boolean;
  setShowInstance2: (value: boolean) => void;
  showInstance3: boolean;
  setShowInstance3: (value: boolean) => void;
  showInstance4: boolean;
  setShowInstance4: (value: boolean) => void;
};

export default function VisibilityOptions({
  showInstance1,
  setShowInstance1,
  showInstance2,
  setShowInstance2,
  showInstance3,
  setShowInstance3,
  showInstance4,
  setShowInstance4,
}: VisibilityOptionsProps) {
  const showInstance1Id = useId();
  const showInstance2Id = useId();
  const showInstance3Id = useId();
  const showInstance4Id = useId();

  function onShowInstance1Change(event: React.ChangeEvent<HTMLInputElement>) {
    setShowInstance1(event.target.checked);
  }

  function onShowInstance2Change(event: React.ChangeEvent<HTMLInputElement>) {
    setShowInstance2(event.target.checked);
  }

  function onShowInstance3Change(event: React.ChangeEvent<HTMLInputElement>) {
    setShowInstance3(event.target.checked);
  }

  function onShowInstance4Change(event: React.ChangeEvent<HTMLInputElement>) {
    setShowInstance4(event.target.checked);
  }

  return (
    <fieldset>
      <legend>Visibility options</legend>

      <div>
        <input
          id={showInstance1Id}
          type="checkbox"
          checked={showInstance1}
          onChange={onShowInstance1Change}
        />
        <label htmlFor={showInstance1Id}>Show instance 1</label> <small>(default badge)</small>
      </div>

      <div>
        <input
          id={showInstance2Id}
          type="checkbox"
          checked={showInstance2}
          onChange={onShowInstance2Change}
        />
        <label htmlFor={showInstance2Id}>Show instance 2</label> <small>(inline badge)</small>
      </div>

      <div>
        <input
          id={showInstance3Id}
          type="checkbox"
          checked={showInstance3}
          onChange={onShowInstance3Change}
        />
        <label htmlFor={showInstance3Id}>Show instance 3</label>{' '}
        <small>(inline badge, too; hidden badge; use to test multiple instances)</small>
      </div>

      <div>
        <input
          id={showInstance4Id}
          type="checkbox"
          checked={showInstance4}
          onChange={onShowInstance4Change}
        />
        <label htmlFor={showInstance4Id}>Show instance 4</label>{' '}
        <small>(different settings; should crash unless 1 and 2 are hidden)</small>
      </div>
    </fieldset>
  );
}
