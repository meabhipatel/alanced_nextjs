import { FC } from "react";

interface IProps {
  params: {
    id: string;
  };
}

const ViewProposal: FC<IProps> = ({ params }) => {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <h1 className="text-3xl font-semibold">View Proposal {params.id}</h1>
    </div>
  );
};

export default ViewProposal;
