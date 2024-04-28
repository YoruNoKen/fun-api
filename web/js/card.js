window.onload = async function () {
    const queryParams = new URLSearchParams(window.location.search);

    const username = queryParams.get("username") ?? "yorunoken";
    const mode = queryParams.get("mode") ?? "0";

    const baseUrl = window.location.href.split("/").slice(0, -1).join("/");
    const player = await fetch(`${baseUrl}/user?username=${username}&mode=${mode}`).then((res) => res.json());

    document.getElementById("username").textContent = player.username;
    document.getElementById("rank").textContent = `#${Number(player.pp_rank).toLocaleString()}`;
    document.getElementById("accuracy").textContent = `${Number(player.accuracy).toFixed(2)}%`;
    document.getElementById("avatar").src = `https://a.ppy.sh/${player.user_id}`;
    const levelDoc = document.getElementById("level");
    levelDoc.textContent = `${Number(player.level).toFixed(2)}%`;

    levelDoc.style.background = `linear-gradient(to right, gold ${player.level + "%"}, rgba(80, 80, 80, 1) ${player.level + "%"})`;
};
