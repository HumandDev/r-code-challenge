import { useState } from "react";
import "./App.css";
import { useParams } from "react-router-dom";
import { CircularProgress, Snackbar } from "@mui/material";

import {
  createComment,
  deleteCharacter,
  getCharacter,
  getComments,
  getInteractions,
} from "../services/character";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@tanstack/react-query";
import Interactions from "../components/Interactions";
import ConfirmationModal from "../components/ConfirmationModal";
import Episodes from "../components/Episodes";
import Comments from "../components/Comments";

function Character() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [showDeleteToast, setShowDeleteToast] = useState<boolean>(false);
  const [commentBody, setCommentBody] = useState<string>("");

  const {
    data: character,
    refetch: refetchCharacter,
    isLoading: loading,
  } = useQuery({
    queryKey: ["character"],
    queryFn: async () => {
      const { data } = await getCharacter(+id!);
      return data;
    },
  });

  const {
    data: comments,
    refetch: refetchComments,
    isLoading: commentsLoading,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await getComments(+id!);
      return res.data;
    },
  });

  const { data: interactions, isLoading: interactionsLoading } = useQuery({
    queryKey: ["interactions"],
    queryFn: async () => {
      const res = await getInteractions(+id!);
      return res.data;
    },
  });

  const deleteAction = async (id: number) => {
    setDeleteModalOpen(false);
    await deleteCharacter(id);
    refetchCharacter();
    setShowDeleteToast(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (commentBody.length > 0) {
      await createComment(+id!, commentBody);
      setCommentBody("");
      refetchComments();
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col items-center bg-slate-600 p-4">
      <Snackbar
        open={showDeleteToast}
        autoHideDuration={3000}
        onClose={() => setShowDeleteToast(false)}
        message="Character deleted!"
      />
      {loading && <CircularProgress className="mt-20" />}
      {!loading && !character && (
        <div className="text-2xl font-bold text-slate-200">
          Character not found!
        </div>
      )}
      {character && (
        <div className="flex flex-col gap-2 min-w-[600px]">
          {!character.deleted && (
            <div className="flex flex-row items-center justify-between w-full">
              <button onClick={() => setDeleteModalOpen(true)}>
                <DeleteIcon fontSize="large" sx={{ color: "#0f172a" }} />
              </button>
              <button onClick={() => navigate(`/${character.id}/edit`)}>
                <EditIcon fontSize="large" sx={{ color: "#0f172a" }} />
              </button>
            </div>
          )}
          <div className="w-full flex flex-row items-center justify-center">
            <img
              src={character.image}
              alt={character.name}
              className="rounded-full border-4 border-slate-500 w-48 h-48"
            />
          </div>
          <div className="p-6 border-4 border-slate-700 rounded-xl">
            <h1 className="font-bold font-sans text-4xl text-slate-100 mb-4">
              {character.name}
              <span className="text-red-400">
                {character.deleted ? " (Deleted)" : ""}
              </span>
            </h1>
            <p className="text-lg text-slate-300">
              <b>Status:</b> {character.status}
            </p>
            <p className="text-lg text-slate-300">
              <b>Species:</b> {character.species}{" "}
              {character.type ? `(${character.type})` : ""}
            </p>
            <p className="text-lg text-slate-300">
              <b>Last known location:</b> {character.location.name}
            </p>
            <Episodes episodes={character.episode} />
            <Interactions
              interactions={interactions}
              loading={interactionsLoading}
            />
            <Comments
              comments={comments}
              canComment={!character.deleted}
              handleChange={(e) => setCommentBody(e.target.value)}
              handleSubmit={handleSubmit}
              value={commentBody}
              disabled={commentsLoading}
            />
          </div>
          <ConfirmationModal
            text={`Are you sure you want to delete ${character.name}`}
            onConfirm={() => deleteAction(character.id)}
            onReject={() => setDeleteModalOpen(false)}
            opened={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Character;
