var site_uri = 'http://localhost:3000';

$(document).ready(function () {
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();

	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$('#selectAll').click(function () {
		if (this.checked) {
			checkbox.each(function () {
				this.checked = true;
			});
		} else {
			checkbox.each(function () {
				this.checked = false;
			});
		}
	});
	checkbox.click(function () {
		if (!this.checked) {
			$('#selectAll').prop('checked', false);
		}
	});

	// Display add-employee success message
	$('#add_employee').submit(function (e) {
		alert('Employee added successfully!');
	});

	// Edit employee
	$('#edit_employee').submit(function (e) {
		e.preventDefault();
		var data = {};
		var unindexed_array = $(this).serializeArray();
		$.map(unindexed_array, function (n, i) {
			data[n['name']] = n['value'];
		});
		//console.log(data);
		var request = {
			//url: `${process.env.SITE_URI}/employee/${data.id}`,
			url: `${site_uri}/employee/${data.id}`,
			method: 'PUT',
			data: data,
		};

		$.ajax(request).done(function (res) {
			alert('Employee updated successfully!');
		});
	});

	// DELTE EMPLOYEE with confirm()
	if (window.location.pathname == '/') {
		$ondelete = $('.table tbody td a.delete');
		$ondelete.click(function () {
			var id = $(this).attr('data-id');

			var request = {
				url: `${site_uri}/employee/${id}`,
				method: 'DELETE',
			};

			if (confirm('Do you really want to delete this record?')) {
				$.ajax(request).done(function (response) {
					alert('Data Deleted Successfully!');
					location.reload();
				});
			}
		});
	}

	// Delete Employee with Bootstrap modal
	// if (window.location.pathname == '/') {
	//     let id;
	//     var modalConfirm = function (callback) {
	// 		$('#btn-confirm').on('click', function (e) {
	//             e.preventDefault();
	//             id = $(this).attr('data-id');
	// 			console.log(id);
	// 			$('#mi-modal').modal('show');
	// 		});

	// 		$('#modal-btn-si').on('click', function () {
	// 			callback(true);
	// 			$('#mi-modal').modal('hide');
	// 		});

	// 		$('#modal-btn-no').on('click', function () {
	// 			callback(false);
	// 			$('#mi-modal').modal('hide');
	// 		});
	// 	};

	// 	modalConfirm(function (confirm) {
	// 		if (confirm) {
	//             console.log(id);
	// 			var request = {
	// 				//url: `${process.env.SITE_URI}/employee/${id}`,
	// 				url: `http://localhost:3000/employee/${id}`,
	// 				method: 'DELETE',
	// 			};
	// 			$.ajax(request).done(function (response) {
	// 				alert('Data Deleted Successfully!');
	// 				location.reload();
	// 			});
	// 		}
	// 	});
	// }
});



