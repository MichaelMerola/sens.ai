import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default function ProgressBar(props) {
  const percentage = (() => {
    const completed = props.units.filter(unit => {
      return unit.isComplete;
    }).length;
    if (completed === 0) return 5;
    return (completed/props.units.length)*100;
  })();

  return (
    <div className="progress">
      <div className="bar" style={{ width: `${percentage}%` }} />
    </div>
  );
}