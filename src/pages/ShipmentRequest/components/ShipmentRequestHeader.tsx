interface ShipmentRequestHeaderProps {
  title: React.ReactNode;
  description: React.ReactNode;
}
export default function ShipmentRequestHeader(
  props: ShipmentRequestHeaderProps
) {
  return (
    <div className="flex flex-col gap-2 text-primary">
      <h1 className="font-bold">{props.title}</h1>
      <span className="leading-tight text-sm">{props.description}</span>
    </div>
  );
}
