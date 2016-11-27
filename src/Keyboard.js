import React from 'react';


const DarkKey = ({ pos, label }) => (
  <g className="key dark" transform={`translate(${pos * 100})`}>
    <path style={{fill:'#333333'}} d="M94,100H6c-3.3,0-6-2.7-6-6V6c0-3.3,2.7-6,6-6h88c3.3,0,6,2.7,6,6v88C100,97.3,97.3,100,94,100z"/>
    <path style={{fill:'url(#gradient-light)',stroke:'#545453',strokeWidth:2,strokeMiterlimit:10}}
      d="M87,2H13c-4.4,0-8,3.6-8,8v74v3c0,4.4,3.6,8,8,8h74c4.4,0,8-3.6,8-8v-3V10C95,5.6,91.4,2,87,2z"/>
    <text transform="matrix(1 0 0 1 10 84)" className="label">{label}</text>
  </g>
)

const LightKey = () => (
  <g className="key light">
    <path style={{fill:'#A3A2A2'}} d="M94,200H6c-3.3,0-6-2.7-6-6V6c0-3.3,2.7-6,6-6h88c3.3,0,6,2.7,6,6v188C100,197.3,97.3,200,94,200z"/>
    <path style={{fill:'url(#gradient-dark)',stroke:'#DCDBDB',strokeWidth:2,strokeMiterlimit:10}}
      d="M87,2H13c-4.4,0-8,3.6-8,8v174v3c0,4.4,3.6,8,8,8h74c4.4,0,8-3.6,8-8v-3V10C95,5.6,91.4,2,87,2z"/>
    <text transform="matrix(1 0 0 1 10 184)" className="label">A</text>
  </g>
)

export default function Keyboard(props) {
  return (
    <svg>
      <linearGradient id="gradient-light" gradientUnits="userSpaceOnUse" x1="171.3889" y1="150.9445" x2="261.3889" y2="150.9445">
      	<stop  offset="0" style={{stopColor:'#2E2E2E'}}/>
      	<stop  offset="4.706972e-02" style={{stopColor:'#313131'}}/>
      	<stop  offset="0.2824" style={{stopColor:'#3D3C3E'}}/>
      	<stop  offset="0.51" style={{stopColor:'#414042'}}/>
      	<stop  offset="0.7134" style={{stopColor:'#3D3C3E'}}/>
      	<stop  offset="0.9239" style={{stopColor:'#313131'}}/>
      	<stop  offset="1" style={{stopColor:'#2B2B2B'}}/>
      </linearGradient>
      <linearGradient id="gradient-dark" gradientUnits="userSpaceOnUse" x1="47.2222" y1="200.9445" x2="137.2222" y2="200.9445">
      	<stop  offset="0" style={{stopColor:'#E2E2E2'}}/>
      	<stop  offset="0.1618" style={{stopColor:'#DCDDDD'}}/>
      	<stop  offset="0.51" style={{stopColor:'#D3D5D6'}}/>
      	<stop  offset="0.8445" style={{stopColor:'#DCDDDD'}}/>
      	<stop  offset="1" style={{stopColor:'#E2E2E2'}}/>
      </linearGradient>
      <DarkKey pos={0} label="W" />
    </svg>
  );
}
