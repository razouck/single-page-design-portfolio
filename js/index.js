function init()
{
	const carousel          = document.querySelector("#carousel");
	const carousel_controls = document.querySelector(".carousel-controls");

	controlCarousel(carousel, carousel_controls);

	document.addEventListener("mousemove", event =>
	{
		const element = event.target;
		const tag     = element.tagName.toLowerCase();
		const classes = element.className.toLowerCase().split(" ");

		if (tag !== "button" && !classes.includes("button")) return;

		const rect   = element.getBoundingClientRect();
		const left   = rect.left;
		const top    = rect.top;
		const width  = rect.width;
		const height = rect.height;
		const x      = ( event.clientX - left ) / width;
		const y      = ( event.clientY - top ) / height;

		element.style.setProperty("--x", x);
		element.style.setProperty("--y", y);
	});

	function controlCarousel(carousel, controls)
	{
		const slides = carousel.querySelectorAll("li");

		controls.addEventListener("click", e =>
		{
			const view_width = innerWidth;
			const gap        = parseInt(getComputedStyle(carousel).columnGap);
			const xs         = Array.from(slides, (item, i) =>
			{
				const width    = item.getBoundingClientRect().width;
				const scroll_x = ( gap + width ) * i;
				const offset   = ( view_width - width ) / 2;

				return Math.floor(scroll_x - offset);
			});
			const control    = e.target;
			const tag        = e.target.tagName.toLowerCase();
			const cur_x      = carousel.scrollLeft;

			let next_x = 0;

			// BUG: USE A FUCKING BACKGROUND IMAGE FOT THESE FUCKING BUTTONS.
			if (tag === "button" || tag === "img")
			{
				const direction = control.dataset.direction;

				if (direction === "next")
				{
					next_x = xs.find(x => x > cur_x + 1);
				}
				else if (direction === "previous")
				{
					next_x = xs.findLast(x => x < cur_x);
				}
			}
			carousel.scroll(next_x, 0);
		});
	}
}

init();