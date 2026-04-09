import { useState } from "react";

const steps = [
  {
    id: 1,
    tag: "Terminal",
    title: "Install the SDK",
    code: `npm i @ankur3386/metrics-sdk`,
  },
  {
    id: 2,
    tag: "Dashboard",
    title: "Get your API Key",
    isManual: true,
    desc: "Navigate to your Project page and copy the API key from the settings panel.",
  },
  {
    id: 3,
    tag: "index.js",
    title: "Initialize in your entry file",
    code: `const { initMetrics, userMetrics } = require('@ankur3386/metrics-sdk');

app.use(userMetrics);

initMetrics({
  apiKey: "YOUR_API_KEY_HERE",
  url: "http://localhost:3000/api/v1/client/metric-data"
});`,
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="text-xs px-2 py-1 rounded bg-[#2a2d3e] text-gray-400 hover:text-white border border-white/10 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

const Local_Setup = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="p-6 text-white min-h-screen" style={{ background: "#0d1117" }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-xl font-semibold">Local Setup</h1>
      </div>

      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        Integrate the Metrics SDK into your app in 3 steps — install, authenticate, and initialize.
      </p>

      {/* Steps */}
      <div className="flex flex-col gap-2 max-w-2xl">
        {steps.map((step) => (
          <div
            key={step.id}
            className="rounded-lg border border-white/10 overflow-hidden"
            style={{ background: "#161b27" }}
          >
            <button
              onClick={() => setOpen(open === step.id ? null : step.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {step.id}
              </span>
              <span className="text-xs text-gray-500 w-16 flex-shrink-0">{step.tag}</span>
              <span className="text-sm text-gray-200 flex-1">{step.title}</span>
              <span className="text-gray-500 text-lg leading-none">{open === step.id ? "−" : "+"}</span>
            </button>

            {open === step.id && (
              <div className="px-4 pb-4 border-t border-white/5">
                {step.isManual ? (
                  <div className="mt-3 flex gap-3 items-start rounded-md p-3 bg-yellow-900/20 border border-yellow-500/20">
                    <span className="text-base">🔑</span>
                    <p className="text-sm text-yellow-200/80 leading-relaxed">{step.desc}</p>
                  </div>
                ) : (
                  <div className="mt-3 rounded-md overflow-hidden border border-white/10">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#0d1117] border-b border-white/10">
                      <span className="text-xs text-gray-500">{step.tag}</span>
                      <CopyButton text={step.code} />
                    </div>
                    <pre
                      className="text-xs text-gray-300 p-3 overflow-x-auto leading-relaxed font-mono"
                      style={{ background: "#0d1117" }}
                    >
                      {step.code}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* What each part does */}
      <div className="mt-8 max-w-2xl">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">What each part does</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              fn: "app.use(userMetrics)",
              desc: "Registers SDK middleware. Intercepts every HTTP request and attaches tracking metadata automatically.",
            },
            {
              fn: "initMetrics({ ... })",
              desc: "Bootstraps the SDK. Authenticates via apiKey and forwards data to the specified url.",
            },
          ].map((e) => (
            <div
              key={e.fn}
              className="rounded-lg border border-white/10 p-3"
              style={{ background: "#161b27" }}
            >
              <code className="text-xs text-indigo-400 block mb-2">{e.fn}</code>
              <p className="text-xs text-gray-400 leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full example */}
      <div className="mt-6 max-w-2xl">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Full example</p>
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <div
            className="flex items-center justify-between px-3 py-1.5 border-b border-white/10"
            style={{ background: "#0d1117" }}
          >
            <span className="text-xs text-gray-500">index.js</span>
            <CopyButton
              text={`const express = require('express');
const { initMetrics, userMetrics } = require('@ankur3386/metrics-sdk');

const app = express();

app.use(userMetrics);

initMetrics({
  apiKey: "YOUR_API_KEY_HERE",
  url: "http://localhost:3000/api/v1/client/metric-data"
});

app.listen(3000);`}
            />
          </div>
          <pre
            className="text-xs text-gray-300 p-4 overflow-x-auto leading-relaxed font-mono"
            style={{ background: "#0d1117" }}
          >{`const express = require('express');
const { initMetrics, userMetrics } = require('@ankur3386/metrics-sdk');

const app = express();

app.use(userMetrics);

initMetrics({
  apiKey: "YOUR_API_KEY_HERE",
  url: "http://localhost:3000/api/v1/client/metric-data"
});

app.listen(3000);`}</pre>
        </div>
      </div>

      {/* Done banner */}
      <div className="mt-6 max-w-2xl flex items-center gap-2 text-xs text-green-400 bg-green-900/20 border border-green-500/20 rounded-lg px-4 py-3">
        <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
        Metrics are now being collected. Check your project dashboard to view incoming data.
      </div>
    </div>
  );
};

export default Local_Setup;