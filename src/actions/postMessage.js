const postMessage = (actionType) => {
    if (window.self === window.top) {
        return;
    } else {
        switch (actionType) {
            case 0:
                window.top.simulation_callback_answer_incorrect();
                break;
            case 1:
                window.top.simulation_callback_answer_correct();
                break;
            case 2:
                window.top.simulation_callback_answer_restart();
                break;
            case 3:
                window.top.simulation_callback_answer_complete();
                break;
        
            default:
                break;
        }
    }
}

export default postMessage
