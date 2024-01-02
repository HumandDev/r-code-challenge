import React from "react";
import { Interaction } from "../interfaces/character";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { transformDate } from "../utils";

type Props = {
  interactions?: Interaction[];
  loading: boolean;
  show: boolean;
};

function Interactions({ interactions, loading, show }: Props) {
  if (loading) {
    return <CircularProgress className="mt-20" />;
  }
  if (!interactions || interactions.length <= 0 || !show) {
    return null;
  }
  return (
    <Accordion className="mt-2">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: "rgb(203 213 225 / 1)",
          borderRadius: "0.375rem",
          overflow: "hidden",
        }}
      >
        <p className="text-lg text-slate-500 font-bold">Interactions</p>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "rgb(203 213 225 / 1)",
        }}
      >
        <ul className="pl-3">
          {interactions.map((interaction) => {
            return (
              <div className="flex flex-row items-center justify-between">
                <span className="uppercase text-lg text-green-800">
                  {interaction.type}
                </span>
                <span className="">{transformDate(interaction.createdAt)}</span>
              </div>
            );
          })}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}

export default Interactions;
