import React from "react";
import "./index.css";

/**
 * 見た目がハイパーリンクのボタン
 * @param {} props
 * @returns
 */

export default function LinkButton(props) {
  return <button className="link-button" {...props}>{props.children}</button>;
}
