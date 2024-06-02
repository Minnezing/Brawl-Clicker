function setEffect(icon, name, description, duration) {
    effectsBuffer.push(
        {
            name,
            start: Date.now(),
            duration: duration,
            description,
            icon
        }
    );
    setData("effects", effectsBuffer);
}

function clearEffect(name) {
    let effectIndex = effectsBuffer.findIndex(eff => eff.name == name);
    effectsBuffer.splice(effectIndex, 1);
    setData("effects", effectsBuffer);
}

function isEffectActive(name) {
    let effect = effectsBuffer.find(eff => eff.name == name);
    if (!effect) return false;
    if (Number(effect.start) + Number(effect.duration) < Date.now() && Number(effect.duration) !== 0) return false;
    return true;
}