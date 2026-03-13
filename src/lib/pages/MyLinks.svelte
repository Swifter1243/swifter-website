<script lang="ts">
    import SocialLink from "$lib/components/SocialLink.svelte";

    const casual = [
        {
            label: "Email",
            href: "mailto:swifter1243@gmail.com",
            background: "rgb(247, 48, 48)",
            shadowColor: "rgb(247, 48, 48, 0.5)"
        },
        {
            label: "Twitter",
            href: "https://twitter.com/Swifter1243",
            background: "#1da1f2",
            shadowColor: "rgb(29, 161, 242, 0.5)"
        },
        {
            label: "Bluesky",
            href: "https://bsky.app/profile/swifter1243.dev",
            background: "#0085ff",
            shadowColor: "rgb(0, 133, 255, 0.5)"
        },
        {
            label: "Discord",
            href: "https://discord.gg/rDNuHgWbBT",
            background: "#5865f2",
            shadowColor: "rgb(88, 101, 242, 0.5)"
        },
        {
            label: "Youtube",
            href: "https://www.youtube.com/c/SwifterYT",
            background: "#ff0000",
            shadowColor: "rgb(255, 0, 0, 0.5)"
        },
        {
            label: "Instagram",
            href: "https://www.instagram.com/swifter1243/",
            background: "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            shadowColor: "rgba(157,20,116,0.5)"
        },
        {
            label: "Soundcloud",
            href: "https://soundcloud.com/swifter1243",
            background: "#ff5500",
            shadowColor: "rgb(255, 85, 0, 0.5)"
        }
    ]

    const professional = [
        {
            label: "Email",
            href: "mailto:elijahdrewstafford@gmail.com",
            background: "rgb(247, 48, 48)",
            shadowColor: "rgb(247, 48, 48, 0.5)"
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/elijah-stafford/",
            background: "#0a66c2",
            shadowColor: "rgb(10, 102, 194, 0.5)"
        },
        {
            label: "GitHub",
            href: "https://github.com/Swifter1243",
            background: "#b6bfb8",
            shadowColor: "rgb(182, 191, 184, 0.5)"
        },
        {
            label: "Ko-Fi",
            href: "https://ko-fi.com/swifter",
            background: "#ff6060",
            shadowColor: "rgb(255, 96, 96, 0.5)"
        }
    ]
</script>

<style>
    .columns {
        display: flex;
        gap: 20px;
        flex-wrap: wrap
    }

    .column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 300px
    }

    h1 {
        margin: 10px;
        text-decoration: underline;
    }
</style>

<h2>Here's where to contact me or see what I'm up to!</h2>

<div class="columns">
    <div class="column">
        <h1>Casual</h1>

        {#each casual as link}
            <SocialLink {...link}>{link.label}</SocialLink>
        {/each}
    </div>

    <div class="column">
        <h1>Professional</h1>

        {#each professional as link}
            <SocialLink {...link}>{link.label}</SocialLink>
        {/each}
    </div>
</div>