const words = ['Find the opportunity', 'Map the workflow', 'Build with AI', 'Keep people in control'];

export function WorkflowRibbon() {
  return (
    <div className="lm-workflow-ribbon" data-lm-ambient="" aria-label={words.join('. ')}>
      <div className="lm-workflow-ribbon__track" aria-hidden="true">
        {[0, 1, 2, 3].map((copy) => (
          <div className="lm-workflow-ribbon__group" key={copy}>
            {words.map((word, i) => (
              <span key={word}><span className={'lm-ribbon-mark lm-ribbon-mark--' + i} />{word}<svg viewBox="0 0 24 24"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
