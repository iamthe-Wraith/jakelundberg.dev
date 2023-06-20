<script lang="ts">
	import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
  import rough from 'roughjs';

  interface INavItem {
    icon: string;
    title: string;
    name: string;
    href: string;
    isActive: boolean;
    desc: string;
  }

  const navItems: Record<string, INavItem> = {
    home: {
      icon: 'ion:home-outline',
      title: 'Home',
      name: 'home',
      href: '/',
      isActive: false,
      desc: 'Home',
    },
    projects: {
      icon: 'ion:code-slash-outline',
      title: 'Projects',
      name: 'projects',
      href: '/projects',
      isActive: false,
      desc: 'Work and Projects',
    },
    blog: {
      icon: 'ion:newspaper-outline',
      title: 'Blog',
      name: 'blog',
      href: '/blog',
      isActive: false,
      desc: 'Writing',
    },
    reading: {
      icon: 'ion:book-outline',
      title: 'Reading',
      name: 'reading',
      href: '/reading',
      isActive: false,
      desc: 'Reading List',
    },
    tools: {
      icon: 'ion:build-outline',
      title: 'Tools',
      name: 'tools',
      href: '/tools',
      isActive: false,
      desc: 'Tool Set',
    },
    about: {
      icon: 'ion:skull-outline',
      title: 'About',
      name: 'about',
      href: '/about',
      isActive: false,
      desc: 'About Me',
    },
  };

  let mounted = false;
  let engagedItemTitle = '';

  const engagedItemTitleVisibility = tweened(0, {
    duration: 200,
    easing: cubicInOut,
  });

  $: {
    if (mounted) {
      Object.keys(navItems).forEach((key) => {
        navItems[key].isActive = $page.url.pathname === navItems[key].href;
      });
    }
  }

  onMount(() => {
    mounted = true;

    Object.keys(navItems).forEach((key) => {
      drawActiveSvg(navItems[key].name);
      drawEngageableSvg(navItems[key].name);
    });
  });

  function drawActiveSvg(name: string) {
    const id = `rough-${name}-active`;
    const svg = document.getElementById(id) as unknown as SVGSVGElement
    const rect = svg.getBoundingClientRect();
    const roughSvg = rough.svg(svg);

    const options = {
      stroke: 'oklch(80% 0.18 80.47)',
      strokeWidth: 2,
      roughness: 1.5,
    }

    const offset = 8;

    const line1 = roughSvg.line(offset, offset, (rect.width - offset), (rect.height - offset), options);
    const line2 = roughSvg.line((rect.width - offset), offset, offset, (rect.height - offset), options);
    svg.appendChild(line1);
    svg.appendChild(line2);
  };

  function drawEngageableSvg(name: string) {
    const id = `rough-${name}-engageable`;
    const svg = document.getElementById(id) as unknown as SVGSVGElement
    const roughSvg = rough.svg(svg);
    const circle = roughSvg.circle(25, 25, 40, {
      stroke: 'oklch(80% 0.18 80.47)',
      strokeWidth: 2,
      roughness: 1.5,
    });
    svg.appendChild(circle);
  };

  function onEngaged(navItem: INavItem, engaged: boolean) {
    if (engaged && !navItem.isActive) {
      engagedItemTitle = navItem.desc;
      $engagedItemTitleVisibility = 1;
    } else {
      $engagedItemTitleVisibility = 0;
    }

    return () => {}
  }
</script>

<svelte:head>
  {#each Object.values(navItems) as value}
    {#if value.isActive}
      <title>{value.title}</title>
    {/if}
  {/each}
</svelte:head>

<nav>
  {#each Object.values(navItems) as navItem}
    <span class="link-label" id={navItem.name}>{navItem.desc}</span>
    <a
      href={navItem.href}
      class={navItem.isActive ? 'active' : ''}
      aria-disabled={navItem.isActive}
      aria-labelledby={navItem.name}
      tabindex={navItem.isActive ? -1 : 0}
      on:mouseenter={onEngaged(navItem, true)}
      on:mouseleave={onEngaged(navItem, false)}
      on:focus={onEngaged(navItem, true)}
      on:blur={onEngaged(navItem, false)}
    >
      <svg id={`rough-${navItem.name}-active`} class="rough-active" />
      <svg id={`rough-${navItem.name}-engageable`} class="rough-engageable" />
      <span>
        <Icon icon={navItem.icon} />
      </span>
    </a>
  {/each}
  <div
    class="engaged-item-title"
    style="opacity: {$engagedItemTitleVisibility}; transform: translate3d({$engagedItemTitleVisibility * -20}px, 0, 0); transform-style: preserve-3d;"
  >
    {engagedItemTitle}
  </div>
</nav>

<style lang="scss">
  nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .link-label {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
    visibility: hidden;
  }

  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    text-decoration: none;
    outline: none;

    &.active {
      pointer-events: none;

      * {
        pointer-events: none;
      }

      .rough-active {
        opacity: 1;
        transition: 0.15s opacity ease-in-out;
      }
    }

    &:not(.active):hover,
    &:not(.active):focus {
      .rough-engageable {
        opacity: 1;
        transition: 0.15s opacity ease-in-out;
      }
    }

    .rough-active {
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      width: 50px;
      height: 50px;
      transform: translate(-50%, -50%);
      transition: 0.15s opacity ease-in-out;
    }

    .rough-engageable {
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      width: 50px;
      height: 50px;
      transform: translate(-50%, -50%);
      transition: 0.15s opacity ease-in-out;
    }

    span {
      font-size: 2rem;
      color: white;
      transition: 0.25s ease-in-out;
      line-height: 0;
    }
  }

  .engaged-item-title {
    position: absolute;
    top: 100%;
    right: -20px;
    font-family: var(--font-primary);
    font-size: 0.8rem;
    color: var(--secondary-500);
    text-align: right;
    overflow: hidden;
  }
</style>