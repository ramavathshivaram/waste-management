import CollectorCard from "../common/Collectorcard";

const Section = ({ title, data }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No collectors found</p>
      ) : (
        <div className="grid-container">
          {data.map((collector) => (
            <CollectorCard key={collector._id} collector={collector} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
