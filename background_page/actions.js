function openLinkInCurrentTab(url)
{
  _withCurrentTabOfTopmostWindowDo(function(base_tab) {
    _emulateNativeOpenLinkInCurrentTab(url, base_tab);
  });
}

function openLinkInNewBackgroundTab(url)
{
  _withCurrentTabOfTopmostWindowDo(function(base_tab) {
    _emulateNativeOpenLinkInNewBackgroundTab(url, base_tab);
  });
}

function _withCurrentTabOfTopmostWindowDo(action_callback)
{
  chrome.tabs.getSelected(null, action_callback);
}

function _emulateNativeOpenLinkInCurrentTab(url, base_tab)
{
  chrome.tabs.update(base_tab.id, {url: url});
}

function _emulateNativeOpenLinkInNewBackgroundTab(url, base_tab)
{
  chrome.tabs.create({
    windowId: base_tab.windowId,
    index:    base_tab.index + 1,
    url:      url,
    selected: false
  });
}

