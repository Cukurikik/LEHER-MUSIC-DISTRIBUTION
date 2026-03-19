import React, { useState, useEffect, useRef } from 'react';

const LOG_LEVELS = {
  INFO: 'text-cyan-400',
  SUCCESS: 'text-green-400',
  WARN: 'text-yellow-400',
  ERROR: 'text-red-500',
  PAYMENT: 'text-lime-400',
};

const generateLogLine = () => {
  const timestamp = new Date().toISOString();
  const events = [
    { level: 'INFO', msg: `DELIVERY_SVC | Spotify | BATCH_ID:${Math.random().toString(36).substr(2, 6)} | OK` },
    { level: 'INFO', msg: `DELIVERY_SVC | Apple Music | BATCH_ID:${Math.random().toString(36).substr(2, 6)} | OK` },
    { level: 'SUCCESS', msg: `RELEASE_SVC | ID:song-${Date.now()} | STATUS:APPROVED` },
    { level: 'PAYMENT', msg: `ROYALTY_SVC | PAYOUT_ID:${Math.random().toString(36).substr(2, 8)} | AMT:$${(Math.random() * 500).toFixed(2)} | COMPLETED` },
    { level: 'WARN', msg: `ANALYTICS_SVC | High latency detected on partner endpoint: TIDAL` },
    { level: 'INFO', msg: `USER_SVC | New user registered from region:ID` },
    { level: 'ERROR', msg: `AUTH_SVC | Failed login attempt for user: admin | IP:192.168.1.10` },
  ];
  const event = events[Math.floor(Math.random() * events.length)];
  return `[${timestamp}] [${event.level}] ${event.msg}`;
};

const AdminTerminal: React.FC = () => {
  const [logLines, setLogLines] = useState<string[]>([]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialLines = Array.from({ length: 20 }, generateLogLine).reverse();
    setLogLines(initialLines);

    const interval = setInterval(() => {
      setLogLines(prevLines => [generateLogLine(), ...prevLines].slice(0, 100));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = 0;
    }
  }, [logLines]);

  const getLineColor = (line: string) => {
    if (line.includes('[SUCCESS]')) return LOG_LEVELS.SUCCESS;
    if (line.includes('[PAYMENT]')) return LOG_LEVELS.PAYMENT;
    if (line.includes('[WARN]')) return LOG_LEVELS.WARN;
    if (line.includes('[ERROR]')) return LOG_LEVELS.ERROR;
    return LOG_LEVELS.INFO;
  };

  return (
    <div className="bg-black/80 rounded-2xl border-2 border-singularity-purple/30 h-full flex flex-col font-mono text-sm shadow-2xl shadow-singularity-purple/20">
      <div className="flex-shrink-0 bg-gray-800/50 p-3 flex items-center justify-between rounded-t-2xl border-b border-singularity-purple/30">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <p className="text-gray-400">/var/log/leher_platform.log</p>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400 text-xs">LIVE</span>
         </div>
      </div>
      <div ref={terminalBodyRef} className="flex-grow p-4 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
        <div className="flex flex-col-reverse">
            {logLines.map((line, index) => (
              <p key={index} className={`whitespace-pre-wrap ${getLineColor(line)}`}>
                <span className="text-gray-500 mr-2">&gt;</span>{line}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTerminal;