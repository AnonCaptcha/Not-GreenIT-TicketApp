/* Update button handler : set the selected id in the modal */
$(document).on('click','.update-button', function(event){
    let id = $(this).attr('value');
    $("#idInputUpdate").attr('value',id);
 });

 $(document).on('click','.answer-button', function(event){
    let id = $(this).attr('value');
    $("#idInputAnswer").attr('value',id);
 });

 /* Trigger form validation process when update */
$(document).on('click','#updateModalSendButton', function(event){
    if($('#userIdInputUpdate')[0].value == '') {
        $('#userIdInputUpdate')[0].focus();
        $('#userIdInputUpdate')[0].reportValidity();
        return;
    }
    if($('#subjectInputUpdate')[0].value == '') {
        $('#subjectInputUpdate')[0].focus();
        $('#subjectInputUpdate')[0].reportValidity();
        return;
    }
    if($('#descriptionInputUpdate')[0].value == '') {
        $('#descriptionInputUpdate')[0].focus();
        $('#descriptionInputUpdate')[0].reportValidity();
        return;
    }
    $("#formUpdate").submit();
 });

/* Trigger form validation process when add */
$(document).on('click','#addModalSendButton', function(event){
    if($('#userIdInputAdd')[0].value == '') {
        $('#userIdInputAdd')[0].focus();
        $('#userIdInputAdd')[0].reportValidity();
        return;
    }
    if($('#subjectInputAdd')[0].value == '') {
        $('#subjectInputAdd')[0].focus();
        $('#subjectInputAdd')[0].reportValidity();
        return;
    }
    if($('#descriptionInputAdd')[0].value == '') {
        $('#descriptionInputAdd')[0].focus();
        $('#descriptionInputAdd')[0].reportValidity();
        return;
    }
    $("#formAdd").submit();
 });

 /* Trigger form validation process when answer */
$(document).on('click','#answerModalSendButton', function(event){
    if($('#statusSelectAnswer')[0].value == '') {
        $('#statusSelectAnswer')[0].focus();
        $('#statusSelectAnswer')[0].reportValidity();
        return;
    }
    $("#formAnswer").submit();
 });