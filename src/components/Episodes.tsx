import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  episodes: string[];
};

function Episodes({ episodes }: Props) {
  return (
    <Accordion className="mt-2">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: "rgb(203 213 225 / 1)",
          borderRadius: "0.4rem",
        }}
      >
        <p className="text-lg text-slate-500 font-bold">Episodes</p>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "rgb(203 213 225 / 1)",
          borderRadius: "0.4rem",
        }}
      >
        <ul className="pl-3">
          {episodes.map((episode) => {
            let parts = episode.split("/");
            const num = parts[parts.length - 1]
              .replace("]", "")
              .replace('"', "");

            const episodeNumber = "Episode " + num;
            return (
              <a href={episode} target="_blank" rel="noreferrer" key={episode}>
                <li className="text-sm text-slate-500 hover:text-slate-400">
                  {episodeNumber}
                </li>
              </a>
            );
          })}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}

export default Episodes;
