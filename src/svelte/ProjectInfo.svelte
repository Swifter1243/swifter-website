<script lang="ts">
    import {CATEGORIES, type Project, type Skill, SKILLS} from "../nodes/project/project.ts";
    import {getDateMonthName} from "../utilities/date.ts";
    import {navigation} from "../navigation/navigation.ts";

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

{#if project}
<div id="page-project-info">
    <p id="project-timeline" style="font-size: 16px; font-style: italic; color: rgba(255, 255, 255, 0.713);">{parseTimeline(project)}</p>
    <div style="display: flex; flex-direction: row; justify-content: center; gap: 10px;">
        {#if hasLinks(project)}
        <div id="page-project-links">
            {#if project.sourceLink}
                <a id="project-source-link" target="_" href={project.sourceLink} aria-label="Project Source Link"></a>
            {/if}
            {#if project.demoLink}
                <a id="project-demo-link" target="_" href={project.demoLink} aria-label="Project Demo Link"></a>
            {/if}
        </div>
        {/if}
        <div id="page-project-tags">
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