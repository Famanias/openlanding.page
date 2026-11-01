"use client";
import { useState } from "react";
import { getModel, models, type ModelId } from "./models";

export function ModelSwitcher() {
  const [selected, setSelected] = useState<ModelId>("core");
  const model = getModel(selected);
  return <div className="avl-model-stage" data-reveal="scale">
    <div className="avl-model-list" role="group" aria-label="Choose a model">
      {models.map((item, index) => <button key={item.id} type="button" className="avl-model-option" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span className="avl-model-number">0{index + 1}</span><span className="avl-model-option-name">{item.name}<small>{item.id === "core" ? "Everyday intelligence" : item.id === "reason" ? "Deeper reasoning" : "Creative momentum"}</small></span><span className="avl-model-arrow">↗</span></button>)}
    </div>
    <div className="avl-model-detail" aria-live="polite" key={model.id}><div className="avl-detail-top"><span className="avl-model-icon">{model.symbol}</span><span className="avl-mono">{model.tag}</span></div><h3>{model.heading}</h3><p>{model.description}</p><div className="avl-example"><div className="avl-example-prompt"><span>You</span>{model.prompt}</div><div className="avl-example-answer"><span>✳</span>{model.example}</div></div></div>
  </div>;
}
