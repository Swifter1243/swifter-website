<script lang="ts">
    import {CATEGORIES, type Project, type Skill, SKILLS} from "../../nodes/project/project.ts";
    import {getDateMonthName} from "../../utilities/date.ts";
    import {navigation} from "../../navigation/navigation.ts";

    const { project } : { project?: Project } = $props();

    function parseTimeline(project: Project) {
        function formatDate(date: Date) {
            const monthName = getDateMonthName(date)
            const year = date.getFullYear()
            return `${monthName} ${year}`
        }

        const startText = formatDate(project.startDate)

        let endText: string | null = null
        if (project.endDate) {
            endText = formatDate(project.endDate)
        }

        if (startText == endText) {
            return `${startText}`
        } else if (startText && endText) {
            return `${startText} - ${endText}`
        } else {
            return `${startText} - Present`
        }
    }

    function hasLinks(project: Project): boolean {
        return project.demoLink !== undefined || project.sourceLink !== undefined
    }

    function goToCategory() {
        if (!project) return;
        navigation.goToPath("./projects/" + CATEGORIES[project.category]);
    }

    function goToSkill(skill: Skill) {
        navigation.goToPath("./skills/" + SKILLS[skill]);
    }
</script>

<style>
    .root {
        background: linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.9) 0%,
                rgb(53, 59, 35) 20%,
                rgb(35, 43, 59) 80%,
                rgba(0, 0, 0, 0.9) 100%
        );
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 5px 10px 5px 10px;
    }

    .timeline {
        font-size: 16px;
        font-style: italic;
        color: rgba(255, 241, 241, 0.71)
    }

    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
    }

    p {
        text-align: center;
        margin: 3px;
    }

    .tags {
        min-height: 15px;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        gap: 4px;
        margin: 3px;
    }

    .links {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .links > a {
        width: 30px;
        height: 30px;
        border-style: none;
        background-color: rgb(115, 122, 125);
        background-size: 80%;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }

    .source-link {
        background-image: url("/github-white-icon.webp");
    }

    .demo-link {
        background-image: url("/play-button-round-white-icon.webp");
    }

    /* tags */
    .category-tag, .skill-tag, .links > a {
        border-radius: 4px;
    }

    .category-tag:hover, .skill-tag:hover, .links > a:hover {
        filter: brightness(0.7);
    }

    .category-tag:active, .skill-tag:active, .links > a:active {
        filter: brightness(0.4);
    }

    .category-tag, .skill-tag {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
        border-style: none;
        color: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px;
        font-size: 16px;
        height: 30px;
        cursor: pointer;
    }

    .category-tag {
        background-color: rgba(173, 164, 99);
    }

    .skill-tag {
        background-color: rgb(99, 169, 173);
    }
</style>

{#if project}
<div class="root">
    <p class="timeline">{parseTimeline(project)}</p>
    <div class="button-container">
        {#if hasLinks(project)}
        <div class="links">
            {#if project.sourceLink}
                <a class="source-link" target="_" href={project.sourceLink} aria-label="Project Source Link"></a>
            {/if}
            {#if project.demoLink}
                <a class="demo-link" target="_" href={project.demoLink} aria-label="Project Demo Link"></a>
            {/if}
        </div>
        {/if}
        <div class="tags">
            <button
                    class="category-tag"
                    onclick={goToCategory}>
                {project.category}
            </button>

            {#each project.skills as skill}
                <button
                        class="skill-tag"
                        onclick={() => goToSkill(skill)}>
                    {skill}
                </button>
            {/each}
        </div>
    </div>
</div>
{/if}