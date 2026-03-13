<script>
    import DemoButton from "$lib/components/DemoButton.svelte";
    import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";
</script>

<h2>
    BLOON MAN is a game developed by me and my friend Evan in 48 hours for a
    game jam.
</h2>

<div class="descripted-item">
    <div class="horizontal-center">
        <YoutubeVideo videoId="mQ65gSsChR4" width="80%" />
    </div>
    <p>A full playthrough of BLOON MAN.</p>
</div>

<br>

<p>
    BLOON MAN, a platformer where you navigate a dangerous bouncy castle as a
    man made of balloons. Avoid sharp, spiky obstacles to keep bloon-men such as
    yourself safe as you find your escape.
</p>

<div class="spacer"></div>

<div class="content-pair-left">
    <img src="/bloon%20man/door lock sequence.gif" class="landscape-media">

    <div>
        <p>
            I was responsible for creating a lot of effects to make the game
            feel visually reactive, utilizing scripting and Unity's particle
            systems.
        </p>
        <p>
            Some examples of effects I worked on are door locking sequences,
            lock breaking effects, projectile impact particles, and level
            transitions.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <img src="/bloon%20man/levels.png" class="landscape-media">

    <div>
        <p>
            We used prefab variants with Unity's Tilemap system to streamline
            level creation and experiment with what felt right with our
            mechanics.
        </p>
        <p>
            I helped churn out about half of the levels in the project in order
            to get a respectable amount of content during the time limit.
        </p>
    </div>
</div>

<div class="content-pair-left">
    <audio controls>
        <source src="/bloon%20man/theme.wav" type="audio/wav">
        Your browser does not support the audio element.
    </audio>

    <div>
        <p>
            I also created original music for the game.
        </p>
        <p>
            I wanted to go for something sort of whimsical and triumphant, and I
            think it turned out pretty fun.
        </p>
    </div>
</div>

<div class="spacer"></div>

<h2>It won first place in the game jam at my college.</h2>

<DemoButton>DEMO</DemoButton>

<p>Here's a link to try it out!</p>
