$(function() {
    console.log('DOM tree loaded');
    let tbody = $('tbody');
    let container = $('.row');
    $.ajax({
        url: "http://localhost:8000/book",
        dataType: "json",
        type: "GET"
    }).done(function (response) {
        for (let item of response) {
            let htmlElement = $(
                `<tr>
                    <th scope="row">${item.id}</th>
                    <td  data-toggle="collapse" 
                     data-target="#collapseExample${item.id}">${item.title}</td>
                    <td>${item.isbn}</td>
                    <td>${item.author}</td>
                    <td>
                        <button type="button" class="btn btn-danger" id="delete">Usuń</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="5">
                        <div class="collapse" id="collapseExample${item.id}">
                            <div class="card card-body" style="background: #454d55">
                                <ul>
                                    <li>ID: ${item.id}</li>
                                    <li>TYTUŁ: ${item.title}</li>
                                    <li>ISBN: ${item.isbn}</li>
                                    <li>GATUNEK: ${item.genre}</li>
                                    <li>AUTOR: ${item.author}</li>
                                    <li>WYDAWCA: ${item.publisher}</li>
                                </ul>
                            </div>
                        </div>
                    </td>
                </tr>`);
            tbody.append(htmlElement)
        }
    });
    let form = `<form id="addBookForm" action="#" method="post">
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="inputTitle">Tytuł</label>
                          <input type="text" class="form-control" id="title" name="title" placeholder="Tytuł">
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputIsbn">ISBN</label>
                          <input type="text" class="form-control" id="isbn" name="isbn" placeholder="ISBN">
                        </div>
                      </div>
                      <div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="inputAuthor">Autor</label>
                            <input type="text" class="form-control" id="author" name="author" placeholder="Autor">
                          </div>
                          <div class="form-group col-md-6">
                              <label for="inputPublisher">Wydawca</label>
                              <input type="text" class="form-control" id="publisher" name="publisher" placeholder="Wydawca">
                          </div>
                      </div>
                      <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Gatunek</label>
                      </div>
                      <select class="custom-select" id="genre" name="genre">
                        <option selected>Choose...</option>
                        <option id="genre" name="genre">1</option>
                        <option id="genre" name="genre">2</option>
                        <option id="genre" name="genre">3</option>
                        <option id="genre" name="genre">4</option>
                        <option id="genre" name="genre">5</option>
                        <option id="genre" name="genre">6</option>
                        <option id="genre" name="genre">7</option>
                      </select>
                    </div>
                      <button type="submit" class="btn btn-success" id="addBook">Dodaj książkę</button>
                    </form>`;
    container.before(form);
    $('#addBookForm').submit(function () {
        var formData = $(this).serialize();
        $.post({
            url: 'http://localhost:8000/book/',
            data: formData,
            dataType: 'json'
        }).fail(function () {
            alert('Podaj wszystkie dane')
        });
        $('#delete').on('click', function (e) {
            console.log('click');
        })
    });
});
