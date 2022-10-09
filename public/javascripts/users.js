/* Update button handler : set the selected id in the modal */
$(document).on('click','.update-button', function(event){
    var id = $(this).attr('value');
    $("#idInputUpdate").attr('value',id);
 });

$(document).on('click','#updateModalSendButton', function validate (event){
  if($('#nameInputUpdate')[0].value == '') {
      $('#nameInputUpdate')[0].focus();
      $('#nameInputUpdate')[0].reportValidity();
      return;
  }
  if($('#surnameInputUpdate')[0].value == '') {
      $('#surnameInputUpdate')[0].focus();
      $('#surnameInputUpdate')[0].reportValidity();
      return;
  }
  if($('#birthdateInputUpdate')[0].value == '') {
      $('#birthdateInputUpdate')[0].focus();
      $('#birthdateInputUpdate')[0].reportValidity();
      return;
  }
  if($('#profilSelectUpdate')[0].value == '') {
   $('#profilSelectUpdate')[0].focus();
   $('#profilSelectUpdate')[0].reportValidity();
   return;
   }
    $("#formUpdate").submit();
 });

 $(document).on('click','#addModalSendButton', (event) => {
   if($('#nameInputAdd')[0].value == '') {
      $('#nameInputAdd')[0].focus();
      $('#nameInputAdd')[0].reportValidity();
      return;
  }
  if($('#surnameInputAdd')[0].value == '') {
      $('#surnameInputAdd')[0].focus();
      $('#surnameInputAdd')[0].reportValidity();
      return;
  }
  if($('#birthdateInputAdd')[0].value == '') {
      $('#birthdateInputAdd')[0].focus();
      $('#birthdateInputAdd')[0].reportValidity();
      return;
  }
  if($('#profilSelectAdd')[0].value == '') {
   $('#profilSelectAdd')[0].focus();
   $('#profilSelectAdd')[0].reportValidity();
   return;
   }
    $("#formAdd").submit();
 });