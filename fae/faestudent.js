// Based on sample plugin https://github.com/frontapp/frontapp.github.io/
// Trialed using https://gazed.github.io/fae
// The auth secret 8d21e271faa390a4 needs to be validated to confirm that
// communication is from FrontApp.
var conversation;
var contact;

function unassign() {
  Front.unassign(conversation);
}

function toggleArchive() {
  Front.toggleArchive(conversation);
}

function toggleTrashed() {
  Front.toggleTrashed(conversation);
}

function reply() {
  Front.reply({
    body: 'Template reply',
    subject: 'Template subject',
  }, false, conversation);
}

function alertDialog() {
  Front.dialog('alert', {
    title: 'I\'m an alert dialog',
    message: 'You are now alerted',
  }, function () {
    console.log('Alert closed');
  });
}

function confirmDialog() {
  Front.dialog('confirm', {
    title: 'I\'m a confirm dialog',
    message: 'Do you confirm',
    okTitle: 'OK Button',
    cancelTitle: 'Cancel Button'
  }, function (confirmed) {
    if (confirmed)
      console.log('User confirmed');
    else
      console.log('User cancelled');
  });
}

function promptDialog() {
  Front.dialog('prompt', {
    title: 'I\'m a prompt dialog',
    message: 'Please enter something'
  }, function (data) {
    if (data)
      console.log('User input :', data);
    else
      console.log('User cancelled');
  });
}

function fetchTeammates() {
  Front.fetchAllowedTeammates(function (teammates) {
    if (!teammates)
      return;
    console.log(teammates);
  });
}

function fetchInboxes() {
  Front.fetchInboxes(function (inboxes) {
    if (!inboxes)
      return;
    console.log(inboxes);
  });
}

// Register FrontApp callback method.
Front.on('conversation', function (data) {
  console.log('Conversation', data.conversation);
  console.log('Contact', data.contact);
  console.log('Message', data.message);
  console.log('OtherMessages', data.otherMessages);
  conversation = data.conversation;
  contact = data.contact;

  // Have the page update based on the data sent.
  document.getElementById('contact_name').innerHTML = contact.display_name;
  document.getElementById('contact_email').value = contact.handle;
  document.getElementsByClassName("avatar")[0].setAttribute("data-initials", contact.initials);
});

// Register FrontApp callback method.
Front.on('no_conversation', function () {
  console.log('No converstation');
  document.getElementById('contact_name').innerHTML = "";
  document.getElementById('contact_email').value = "";
  document.getElementsByClassName("avatar")[0].setAttribute("data-initials", "-");
});

// Register FrontApp callback method.
Front.on('panel_visible', function (visible) {
  console.log('Panel visible', visible);
});
