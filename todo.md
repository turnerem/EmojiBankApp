# Amount spent
- Add third column for amount
- This value lives in another DB that has three fields: cat (id), jsDate, amount
- Default value of 0
- Maybe this is where graphQl can come into its own. Will it allow me to pull out data and sum fields by day, etc?
- Want to be able to add amount spent (at initial setup too?) with default time of expendture of present

# Emphasis
- emoji on LHS, emo description on RHS, because description supports emoji and not other way round.
- on other pages, only emoji will be used

# V similar views
- spent, saved, and difference: these are very similar, but with different data
- write DRY code with this in mind

## This evening:
- list the steps that need to be taken when setting up SQLite schema.
  - Make them short, sweet, memorable.
- Understand New PROMISES being made in code

## Nice:
- if text boxes have anything in them, 'add' button should be an inviting, pushable colour, and next should be greyed out and INACTIVE.
- change actoun buttons to touchable highlights or another, more configurable button
- In MainView, always make call to db to get cat list?
- Image (cartoonized) of wall street in background, somehow
- OR! on tap, render that rightmost field while increasing the width of the field from 0 to wide-enough (in 1 second. make sticky.)
  - Think it's possible to use Animated (react native docs) for this
  - Need tapped bool to trigger different types of animation
  - Reduce size on tap or enter. Animate increase in tot before decrease. Increment LH num and decrement RH num at same time

## Pretty:
- use lots of space around things, but avoid big font. This will avoid it looking childish, but make it look airy
- on portrait view: can pull up from bottom to see bar charts. As these pull up, background of spreadsheet view fades

## Add Category - checks on inputs:
- If category or emoji already used elsewhere, flag error.
- Do not allow blank fields
- restrict emoji field to emojis only
- restrict number of characters in description?
- restrict number of emojis to 3
- if restrictions not met, submit button should not be active
- if user clicks on higher field, this should become an active text input box
  - but only one row should ever have a text input box
- when list reaches 6 cats, don't allow anymore

## Categories:
- Should be taking categories and adding on values for rendering totals of each spend/save. What's the best way to do all this?

## Utils:
- Maybe make a better num formatter

## React component to build? Or a css thing?
- an emoji keyboard

## Notes on CSS
- margin: This is on the outside of the border. defines the space between html elements.
- padding: is INSIDE the border. It can provide a big comfy cushion around an element's guts.
- if height is provided, margin and padding will work within this restriction.
- if height is not provided, margin and padding on the top and bottom will contribute to height definition.
- really nice explanation of this in pluralsight.
