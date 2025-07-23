type Props = {
  name: string;
};

const ServiceCard = ({ name }: Props) => {
  return (
    <div className="bg-white p-4 shadow rounded-xl border w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <h3 className="text-lg font-bold">{name}</h3>
      <p>Available in your location</p>
    </div>
  );
};

export default ServiceCard;
