import AdminWrapper from "../../../components/Others/AdminWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../state";
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import AdminEquipeCard from "../../../components/Equipe/AdminEquipeCard";
import AdminEquipeCardOverlay from "../../../components/Equipe/AdminEquipeCardOverlay";
import "../../../styles/tableaudebord/TeamAdmin.css";
import AddEquipeForm from "../../../components/Equipe/AddEquipeForm";
import EditEquipeForm from "../../../components/Equipe/EditEquipeForm";

function TeamAdmin() {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useToast();
  const [addEquipeItem, setAddEquipeItem] = useState(false);
  const [editMemberIndex, setEditMemberIndex] = useState(-1);
  const [team, setTeam] = useState([]);
  const [memberOverlay, setMemberOverlay] = useState({});
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getTeamByOrder = async () => {
    try {
      const response = await fetch("/api/admin/team", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();

      if (data.code === 500 || data.code === 429) {
        notify("error", data.error);
      }

      if (data.code === 403) {
        notify("error", data.error);
        dispatch(setLogout());
        navigate("/identification");
      }
      if (data) {
        setTeam(data);
      }
    } catch (error) {
      navigate("error");
      console.error(error);
    }
  };

  useEffect(() => {
    getTeamByOrder();
  }, []);

  const updateOrderMemberById = async (id, order_id) => {
    try {
      const response = await fetch("/api/admin/team/order/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ order_id: order_id }),
      });

      const data = await response.json();

      if (data.code === 500) {
        notify("error", data.error);
      }

      if (data.code === 403) {
        notify("error", data.error);
        dispatch(setLogout());
        navigate("/identification");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDragStart = (e) => {
    setActiveId(e.active.id);
  };

  const handleDragEnd = async (event) => {
    try {
      const { active, over } = event;
      if (active.id !== over.id) {
        const activeDraggableIndex = team.findIndex((t) => t.id === parseInt(active.id));
        const overDraggableIndex = team.findIndex((t) => t.id === parseInt(over.id));

        setTeam(([...items]) => {
          return arrayMove(items, activeDraggableIndex, overDraggableIndex);
        });

        const activeDraggable = team.find((t) => t.id === parseInt(active.id));
        const overDraggable = team.find((t) => t.id === parseInt(over.id));
        await updateOrderMemberById(active.id, overDraggable.order_id);
        await updateOrderMemberById(over.id, activeDraggable.order_id);

        setActiveId(null);
        getTeamByOrder();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMemberTeam = async (id) => {
    try {
      if (!confirm("Voulez-vous supprimer ce membre ?")) return;
      const response = await fetch("/api/admin/team/" + id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      const data = await response.json();
      if (data.code === 500) {
        notify("error", data.error);
      }
      if (data.code === 403) {
        notify("error", data.error);
        dispatch(setLogout());
        navigate("/identification");
      }
      if (data.code === 200) {
        notify("success", data.message);
        getTeamByOrder();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMemberTeam = (id) => {
    deleteMemberTeam(id);
  };

  useEffect(() => {
    const activeMember = team.find((v) => v.id === activeId);
    setMemberOverlay(activeMember);
  }, [activeId, setMemberOverlay]);

  if (team.error) {
    return;
  }

  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.4",
        },
      },
    }),
  };

  return (
    <AdminWrapper title="Gestion De L'Équipe">
      <button className="addEquipeBtn" onClick={() => setAddEquipeItem(!addEquipeItem)}>
        <svg fill="rgb(5, 142, 34)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 01-32 0v-64h-64a16 16 0 010-32h64v-64a16 16 0 0132 0v64h64a16 16 0 010 32z" />
        </svg>
      </button>
      {addEquipeItem && <AddEquipeForm setClose={() => setAddEquipeItem(!addEquipeItem)} reloadEquipes={() => getTeamByOrder()} />}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)} modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={team} strategy={verticalListSortingStrategy}>
          {team.length > 0 &&
            team.map((equipe, index) => (
              <div key={index}>
                <div key={index}>
                  <AdminEquipeCard equipe={equipe} handleEditEquipe={() => setEditMemberIndex(index)} deleteHandleEquipe={() => handleDeleteMemberTeam(equipe.id)} />
                </div>
                {editMemberIndex === index && <EditEquipeForm equipe={equipe} setClose={() => setEditMemberIndex(-1)} reloadEquipes={() => getTeamByOrder()} />}
              </div>
            ))}
          <DragOverlay dropAnimation={dropAnimationConfig} className="dragOverlay">
            {activeId && <AdminEquipeCardOverlay equipe={memberOverlay} />}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </AdminWrapper>
  );
}

export default TeamAdmin;
