1. Pipe
   Validate data contained in the request
   uygulamaya gelen requesti controller a göndermeden önce doğrulamamızı sağlar
2. Guard
   Make sure the user is authenticated
3. Controller
   Route the request to a particular function
4. Services
   Run some business logic
5. Repository
   Access a database

- Request GET localhost:3000/messages
  Retrieve a list of all messages
  Bu durumda hangi katmanlara ihtiyacımız var?
  Controller, Service, Repository

- Request Post localhost:3000/messages
  {"content": "hi there"}
  Create a new message
  Bu durumda hangi katmanlara ihtiyacımız var?
  Pipe, Controller, Service, Repository

- Request GET localhost:3000/messages/:id
  Retrieve a message with a particular ID
  Controller, Service, Repository

  POST /messages/5?validate=true

validate=true -> @Query()
5 -> @Param('id')
{"content" : "hi there"} -> @Body()

### Validation Pipe

https://github.com/typestack/class-validator

- Request Post localhost:3000/messages
  {"content": "hi there"}

1. Use class-transformer to turn the body into an instance of the DTO
2. Use class-validator to validate the instance
3. If there are validation errors, respond immediately, otherwise providew body to request handler

typescript'i direkt okuyabilecek bir motor yok. js e çevrilir ve o şekilde yansır. dist klasörü içerisinde işlenmiş js dosyalarını görebiliriz.

### Services and Repositories

**Services**

- it is a class
- 1st place to put any business logic
- uses one or more repositories to find or store data

**Repositories**

- it is a class
- 1st place to put storage-related logic
- Usualy ends up being a TypeORM entitiy, a Mongoose schema, or similar

- Servisin amacı repository'i kullanmak ve verilere erişim sağlamak
- Repository ve servislerin metotları çok benzerdir.

### Dependencies Injection

Repo olmazsa servis düzgün çalışmaz. bu sebepten aslında pipe controller repository service arasında ciddi bir bağımlılık var
Constructor kullanmak kötü bir kod deneyimidir.

**BAD**
MessageService creates its own copy of MessagesRepository

```
export class MessagesService {
    messagesRepo: MessagesRepository;
    constructor() {
        this.messagesRepo = new MessagesRepository();
    }
}
```

**BETTER**
MessagesService receives its dependency
bu kodun dezavantajı her zaman özellikle MessagesRepository'nin bir kopyasına dayanmasıdır.

```
export class MessagesService {
messagesRepo: MessagesRepository;
constructor(repo: MessagesRepository) {
this.messagesRepo = repo;
}
}
```

**BEST**
MessagesService receives its dependency, and it doesnt specificallt require 'MessagesRepository'

```
interface Repository {
    findOne(id:string);
    findAll();
    create(content: string)
}
export class MessagesService {
    messagesRepo: Repository;

    contructor (repo: Repository){
        this.messagesRepo = repo
    }
}
```

**Nest DI Container/Injector**

```
export class MessagesService {
    messagesRepo: MessagesRepository;
    constructor() {
        this.messagesRepo = new MessagesRepository();
    }
}
```

List of classes and their dependencies
MessagesService class'ı MessagesRepository'e bağımlı
MessagesRepository class'ında bir bağımlılık yok

List of instances that I have created
messagesRepo ve messagesService -> messagesController instance

Container şöyle diyecek: MessagesService'ı oluşturmadan önce MessagesRepository'i oluşturmak gerekiyor. Sonra MessagesRepository'e bakacak ve tamam bunu herhangi bir bağımlılığı yok. böylece doğrudan repoyu oluşturabiliriz. sonra bunu service'ı oluşturmak için kullanabiliriz. sonra bunu kullanarak depoyu oluşturabiliriz.

Bunları DI COntainer hallediyor.

DI Container Flow

1. At startup, register all classes with the container
2. Container will figure out what each dependency each class has
3. We then ask the container to create an instance of a class for us
4. Container creates all required dependencies and gives us the instance
5. Container will hold onto the created dependency instances and reuse them if needed

1 ve 2. maddede her sınıfta Injectable kullan ve bunları modules içerisine ekle
3 ve 4. madde otomatik oalrak gerçekleşiyor. nest bizim için controller instance yaratıyor.
