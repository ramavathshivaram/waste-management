import React from 'react'

const ChartCard = ({title}) => {
  return (
    <div>
      <div className=" rounded-xl shadow p-6 border min-h-[250px]">
        <h3 className="font-semibold mb-4">{title}</h3>
      </div>
    </div>
  );
}

export default ChartCard
