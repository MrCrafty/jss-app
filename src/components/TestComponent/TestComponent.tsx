import React from 'react';

type TestComponentProps = {
  text: string;
  bgColor: string;
};

const handleClick = async () => {
  // await fetch('https://sc-jss-playgroundsc.dev.local/sitecore/api/graph/edge', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     sc_apikey: process.env.SITECORE_API_KEY || '02F45175-364E-42AF-B76E-2E0C8463E07A',
  //   },
  //   body: JSON.stringify({ query: TestComponentData }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
};

const TestComponent = ({ text, bgColor }: TestComponentProps) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={() => {
          handleClick();
        }}
        className={`min-w-[10%] rounded-md px-4 py-2 transition-all ${
          bgColor == 'red'
            ? 'bg-red-500 text-white hover:bg-red-700'
            : bgColor == 'blue'
            ? 'bg-blue-500 text-white hover:bg-blue-700'
            : bgColor == 'out-red'
            ? 'border-2 border-red-500 text-black hover:bg-red-500 hover:text-white'
            : bgColor == 'out-blue'
            ? 'border-2 border-blue-500 text-black hover:bg-blue-500 hover:text-white'
            : 'bg-green-500 text-white hover:bg-green-700'
        }`}
      >
        {text}
      </button>
    </div>
  );
};

export default TestComponent;
