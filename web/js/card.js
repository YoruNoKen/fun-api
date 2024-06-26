window.onload = async function () {
    const queryParams = new URLSearchParams(window.location.search);

    const username = queryParams.get("username") ?? "yorunoken";
    const mode = queryParams.get("mode") ?? "osu";

    const player = await fetch(`/api/user/details?username=${username}&mode=${mode}`).then((res) => res.json());

    const { statistics } = player;

    console.log(player);

    if (!player.id) {
        document.title = `User not found!`;
        console.error("either user was not found, or the request was bad.");
        return;
    }

    document.title = `User card for ${player.username} (#${statistics.global_rank.toLocaleString()})`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute("content", `User card generated by yorunoken, for ${player.username}`);
    } else {
        const newMeta = document.createElement("meta");
        newMeta.setAttribute("name", "description");
        newMeta.setAttribute("content", `User card generated by yorunoken, for ${player.username}`);
        document.head.appendChild(newMeta);
    }
    console.log("updated shiii");

    // const avatarBlob = await fetch(`/api/user/avatar?url=${player.avatar_url}`).then((res) => res.blob());

    document.getElementById("grade-ssh").textContent = statistics.grade_counts.ssh;
    document.getElementById("grade-ss").textContent = statistics.grade_counts.ss;
    document.getElementById("grade-sh").textContent = statistics.grade_counts.sh;
    document.getElementById("grade-s").textContent = statistics.grade_counts.s;
    document.getElementById("grade-a").textContent = statistics.grade_counts.a;

    document.getElementById("username").textContent = player.username;
    document.getElementById("rank").textContent = `#${statistics.global_rank.toLocaleString()}`;
    document.getElementById("country-rank").textContent = `#${statistics.country_rank.toLocaleString()}`;
    document.getElementById("pp").textContent = `${statistics.pp.toFixed(2)}`;
    document.getElementById("accuracy").textContent = `${statistics.hit_accuracy.toFixed(2)}%`;
    document.getElementById("score").textContent = `${statistics.ranked_score.toLocaleString()}`;
    document.getElementById("playcount").textContent = `${statistics.play_count.toLocaleString()}`;
    document.getElementById("combo").textContent = `${statistics.maximum_combo.toLocaleString()}`;
    document.getElementById("avatar").src = `/api/user/avatar?url=${player.avatar_url}`;

    document.getElementById("graph").src = `/api/graph?upside=true&points=${player.rankHistory.data.join(",")}`;

    const { level } = statistics;
    document.getElementById("level").textContent = `${level.current}.${level.progress.toFixed()}%`;
    document.getElementById("level-bar").style.background = `linear-gradient(to right, #5C99AB ${(level.progress + 0.5).toFixed()}%, #2F393E ${(level.progress + 0.5).toFixed()}%)`;

    const skills = await fetch(`/api/user/skills?id=${player.id}`).then((res) => res.json());
    document.getElementById("aim-value").textContent = Number(skills.aim).toFixed(2);
    document.getElementById("bar-aim").style.background = `linear-gradient(to right, #5C99AB ${Number(skills.aim).toFixed()}%, #2F393E ${Number(skills.aim).toFixed()}%)`;

    document.getElementById("speed-value").textContent = Number(skills.speed).toFixed(2);
    document.getElementById("bar-speed").style.background = `linear-gradient(to right, #5C99AB ${Number(skills.speed).toFixed()}%, #2F393E ${Number(skills.speed).toFixed()}%)`;

    document.getElementById("accuracy-value").textContent = Number(skills.acc).toFixed(2);
    document.getElementById("bar-accuracy").style.background = `linear-gradient(to right, #5C99AB ${Number(skills.acc).toFixed()}%, #2F393E ${Number(skills.acc).toFixed()}%)`;

    // const averageAvatarColor = await fetch(`/api/averagecolor?image=${player.avatar_url}`).then((res) => res.json());
    // console.log(averageAvatarColor); // #4010e2

    const generateImage = queryParams.get("img") === "true";
    if (generateImage) {
        const canvas = await html2canvas(document.body);
        document.body.innerHTML = "";
        document.body.appendChild(canvas);
    }
};
