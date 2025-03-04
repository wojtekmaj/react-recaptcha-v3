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
        <input type="checkbox" checked={useRecaptchaNet} onChange={onUseRecaptchaNetChange} />
        <label htmlFor="useRecaptchaNet">Use recaptcha.net</label>
      </div>

      <div>
        <input
          type="checkbox"
          checked={useRecaptchaEnterprise}
          onChange={onUseRecaptchaEnterpriseChange}
        />
        <label htmlFor="useRecaptchaEnterprise">Use reCAPTCHA Enterprise</label>
      </div>

      <div>
        <label htmlFor="reCaptchaKey">Recaptcha key</label>
        <input type="text" value={reCaptchaKey} onChange={onRecaptchaKeyChange} />
      </div>
    </fieldset>
  );
}
