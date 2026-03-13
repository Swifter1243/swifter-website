<script lang="ts">
    import NodeLink from "$lib/components/NodeLink.svelte";
    import YoutubeVideo from "$lib/components/YoutubeVideo.svelte";

    const ids = [
        "rphHsDxJbpg",
        "2SgLtmqxu-k",
        "qZ1prxep0Wc",
        "PUjS2AwQhS0",
        "H1w482lswVA",
        "LJrC3c7LOAk",
        "2GE9DVreIuc",
        "ZbmS_U_FbR0",
        "rU-NGtbrRRA",
        "9XrEjum9oj8",
        "EF4U0uhGN3E",
        "rIoK0epn368",
        "CrEmYVh72Dc",
        "6RisY0QF2TQ",
        "ZpLY_bFoAPw",
        "aJN2cIIEEE8",
        "aWhyneB5HQg",
        "nYzZkMTRywg",
        "yVUZ9FA6Om0",
        "nAh4TSsOcB8",
        "d8QrJxdtDf4",
    ]
</script>

<h2>
    Beat Saber is a virtual reality game where I have created over 50 of my own
    levels for it's community.
</h2>

<p>
    In order to create these levels, I had to create my proprietary tool
    <a class="go-to-path-link" href="./remapper">ReMapper</a>. Additionally, I
    had to invest hundreds and hundreds of hours into learning new concepts as
    well as spend loads of time iterating and polishing from feedback.
</p>

<p>
    We're looking at multiple years of a major learning curve here, so I won't
    cover each map and all it's challenges, but there's some writeups on the
    most significant moments like
    <NodeLink path="./blood-rushing">BRLCTAP</NodeLink> and <NodeLink path="./extra-sensory-ii">Extra Sensory II</NodeLink>
</p>

<div class="spacer"></div>

<h2>Below are some of my favorite levels I have created.</h2>

<div class="content-row">
    {#each ids as id}
        <YoutubeVideo videoId={id} ></YoutubeVideo>
    {/each}
</div>
