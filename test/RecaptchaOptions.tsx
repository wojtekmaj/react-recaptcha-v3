import { useId } from 'react';

type OptionsProps = {
  useRecaptchaNet: boolean;
  setUseRecaptchaNet: (value: boolean) => void;
  useRecaptchaEnterprise: boolean;
  setUseRecaptchaEnterprise: (value: boolean) => void;
  reCaptchaKey: string;
  setRecaptchaKey: (value: string) => void;
};

export default function RecaptchaOptions({
  useRecaptchaNet,
  setUseRecaptchaNet,
  useRecaptchaEnterprise,
  setUseRecaptchaEnterprise,
  reCaptchaKey,
  setRecaptchaKey,
}: OptionsProps) {
  const useRecaptchaNetId = useId();
  const useRecaptchaEnterpriseId = useId();
  const reCaptchaKeyId = useId();

  function onUseRecaptchaNetChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUseRecaptchaNet(event.target.checked);
  }

  function onUseRecaptchaEnterpriseChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUseRecaptchaEnterprise(event.target.checked);
  }

  function onRecaptchaKeyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRecaptchaKey(event.target.value);
  }

  return (
    <fieldset>
      <legend>reCAPTCHA options</legend>

      <div>
        <input
          type="checkbox"
          checked={useRecaptchaNet}
          id={useRecaptchaNetId}
          onChange={onUseRecaptchaNetChange}
        />
        <label htmlFor={useRecaptchaNetId}>Use recaptcha.net</label>
      </div>

      <div>
        <input
          type="checkbox"
          checked={useRecaptchaEnterprise}
          id={useRecaptchaEnterpriseId}
          onChange={onUseRecaptchaEnterpriseChange}
        />
        <label htmlFor={useRecaptchaEnterpriseId}>Use reCAPTCHA Enterprise</label>
      </div>

      <div>
        <label htmlFor={reCaptchaKeyId}>Recaptcha key</label>
        <input
          type="text"
          id={reCaptchaKeyId}
          value={reCaptchaKey}
          onChange={onRecaptchaKeyChange}
        />
      </div>
    </fieldset>
  );
}
