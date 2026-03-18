<script>
    import DemoButton from "$lib/components/DemoButton.svelte";
    import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";
</script>

<h2>SYNERGY is my rhythm game I developed in 3 months.</h2>

<div class="descripted-item">
    <div class="horizontal-center">
        <YoutubeVideo videoId="Fd0vXJZ2NaA" width="80%" />
    </div>
    <p>A recording of SYNERGY gameplay.</p>
</div>

<p>
    The premise is that you slice discs to the beat, and occassionally a second
    cursor will appear that you also need to use.
</p>

<div class="spacer"></div>

<p>
    SYNERGY was my first real attempt at creating a game fully by myself. It
    actually counted as a high-school credit and replaced one of my periods
    during the day. I really wanted to prove what I was really capable of during
    a long-term project.
</p>

<p>
    One of the requirements of the project was heavy documentation of both my
    design and my daily progress. I created both a design document and
    spreadsheet for my daily goals.
</p>

<div class="content-pair-left">
    <img src="/synergy/editor.gif" />
    <div>
        <p>
            One of the first things I did was create a feature rich level
            editor. This would make it much easier for me to create interesting
            charts.
        </p>

        <p>
            It included Blender style transformations, undo/redo, copy and
            pasting, alignment guides, and much more!
        </p>

        <p>
            My goal for the level editor (and the gameplay for that matter) was
            to have everything work at any window size. This was my first
            introduction to adaptive layouts.
        </p>
    </div>
</div>

<div class="content-pair-right">
    <div class="descripted-item">
        <div class="horizontal-center">
            <YoutubeVideo videoId="1ytJws7_EGQ" />
        </div>
        <p>The visuals I created for 'influx'.</p>
    </div>
    <div>
        <p>
            The game includes one built-in level called "influx". The song was
            created by my friend <a href="https://soundcloud.com/kitefield"
                >Kitefield</a
            >, and the visuals and level were created by me.
        </p>

        <p>
            The visual were painstakingly animated in After Effects which took
            forever, but the level editor really accelerated the charting
            process.
        </p>

        <p>
            I created multiple difficulties to extend the accessibility of the
            game, and provide some replayability for those who want a challenge.
        </p>
    </div>
</div>

<p>
    I was very pleased to see some of the Beat Saber community enjoying the
    game, with some even creating and distributing their own custom levels using
    the level editor!
</p>

<div class="descripted-item">
    <img src="/synergy/custom levels.png" class="landscape-media" />
    <p>Some custom levels created by the community.</p>
</div>

<div class="spacer"></div>

<DemoButton>DEMO</DemoButton>

<p>Feel free to try SYNERGY out!</p>
