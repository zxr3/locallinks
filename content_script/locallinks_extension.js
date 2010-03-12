var flag = 'Chrome_LocalLinks_extension_was_already_injected_in_this_document';
if (!document[flag])
{
  // Chrome (as for Chromium 5.0.351.0) doesn't fire 'click' event when middle
  // button is pressed. So unified handling of left/middle mouse clicks should
  // be based on 'mousedown'/'mouseup' events.
  //
  // Mouse click recognized as sequence of:
  //   * 'mousedown'
  //   * 'mouseup' on the SAME element
  //
  // Also 'mouseout' shouldn't occurs between 'mousedown' and 'mouseup'.
  //
  // 'click' event is handled for partial Chrome messages suppressing
  // (as said before, it works only for left mouse click).
  $('a[href^=file://]').
    live('mousedown', handleMousedownOnLink).
    live('mouseout',  handleMouseoutOnLink).
    live('mouseup',   handleMouseupOnLink).
    live('click',     handleClickOnLink)
  document[flag] = true;
}

var element_of_last_mousedown = null;

function handleMousedownOnLink(event)
{
  element_of_last_mousedown = this;
}

function handleMouseoutOnLink(event)
{
  element_of_last_mousedown = null;
}

var clicked_button_to_target_tab_mapping = {
  1: 'current_tab',       // left button
  2: 'new_background_tab' // middle button
}

function handleMouseupOnLink(event)
{
  if (element_of_last_mousedown != this) return;

  var target_tab = clicked_button_to_target_tab_mapping[event.which];
  openUrl(target_tab, this.href);
}

function handleClickOnLink(event)
{
  // suppress Chrome error message in JavaScript console
  // ('Not allowed to load local resource: file://...')
  event.preventDefault();
}

function openUrl(target_tab, url)
{
  chrome.extension.sendRequest({
    target_tab: target_tab,
    url:        url
  });
}

