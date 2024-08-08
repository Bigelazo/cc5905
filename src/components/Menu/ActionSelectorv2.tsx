import { useEffect, useState } from "react";
import { ActionMenu, Action } from "./util";
import ButtonComponent from "../ButtonComponent";

interface ActionSelectorProps {
    currentUnit: string;
    actionSelected: string | null;
    setActionSelected: (actionId: string | null) => void;
    setTargetSelected: (id: string | null) => void;
    actionMenu: ActionMenu;
}

const menu = [
    {
        "name": "Punch",
        "actionId": "1"
    },
    {
        "name": "Move",
        "actionId": "2"
    },
    {
        "name": "Spell",
        "more": [
            {
                "name": "Fireball 20 mana",
                "actionId": "3"
            },
            {
                "name": "Icebolt 10 mana",
                "actionId": "4"
            }
        ]
    },{
        "name": "Equip",
        "more": [
            {
                "name": "Sword",
                "actionId": "10",
                "targetId": "Sword555345516"
            },
            {
                "name": "Axe",
                "actionId": "10",
                "targetId": "Axe801786883"
            }
        ]
    }
]


function drawMenu(menu: any[], breadCrumb: number[]) {
    if(breadCrumb.length === 0) {
        return menu;
    } else{
        let currentMenu = menu;
        for(let i = 0; i < breadCrumb.length; i++) {
            currentMenu = currentMenu[breadCrumb[i]].more;
        }
        return currentMenu;
    }

}



const ActionSelectorv2 = ({
    currentUnit,
    actionSelected,
    setActionSelected,
    setTargetSelected,
    actionMenu,
  }: ActionSelectorProps) => {
    const [breadCrumb, setBreadCrumb] = useState<number[]>([]);
    //const menu = actionMenu;
    const currentMenu = drawMenu(menu, breadCrumb);
    
    const onClickAction = (action: Action) => () => {
    
        if(action.targetId){
            console.log("Target selected")
            setActionSelected(action.actionId);
            setTargetSelected(action.targetId);
        } else{
            console.log("Action selected")
            setActionSelected(action.actionId);
        }
    }
    
    useEffect(() => {
        if(actionSelected === null){
            setBreadCrumb([]);
        }
    }, [actionSelected])

    console.log("oldmenu", actionMenu)
    console.log(currentMenu)
    return (
        <>
        {currentMenu.map((action, index) => {
            const onClick = action.more ? () => setBreadCrumb([...breadCrumb, index]) : onClickAction(action);
            return <ButtonComponent 
            selected={actionSelected === action.actionId}
            onClick={onClick}>{action.name}</ButtonComponent>
        })}
        {breadCrumb.length > 0?
        <ButtonComponent selected={false} onClick={() => setBreadCrumb(breadCrumb.slice(0, -1))}>Back</ButtonComponent>:null}
        </>
    );
}
export default ActionSelectorv2