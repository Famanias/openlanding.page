import { Picture } from "../assets";
import { Eyebrow, rv } from "./Eyebrow";

const CLAIMS = [
  { title: "SOC 2 Type II", text: "Audited annually. Reports available under NDA." },
  { title: "Your region, your data", text: "Run in the EU, US or APAC. Nothing leaves it." },
  { title: "Every hand-off logged", text: "Who did what, with which inputs, and when. Replayable." },
  { title: "Human approval gates", text: "Agents pause for sign-off on anything you mark sensitive." },
  { title: "No training on your work", text: "Your prompts and outputs are never used to train models." },
  { title: "SSO and SCIM", text: "Provision and revoke access from your identity provider." },
];

export function SecuritySlide() {
  return (
    <div className="orr-slide-inner orr-security">
      <Eyebrow n={9}>Security</Eyebrow>
      <h2 className="orr-h2 orr-security__title orr-reveal" style={rv(1)}>
        Built for teams that <em>answer to auditors.</em>
      </h2>
      <ul className="orr-claims">
        {CLAIMS.map((c, i) => (
          <li key={c.title} className="orr-reveal" style={rv(i + 2)}>
            <h3 className="orr-claims__title">{c.title}</h3>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
      <Picture assetKey="security-texture" alt="" className="orr-security__texture orr-reveal" sizes="30vw" />
    </div>
  );
}
