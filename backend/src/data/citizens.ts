import type { Citizen } from '../types/citizen'

export const initialCitizens: Citizen[] = [
  {
    id: '1',
    fullName: 'Иванов Сергей Павлович',
    birthDate: '1987-04-12',
    gender: 'male',
    phone: '+7 900 100-10-01',
    email: 'ivanov.sergey@example.ru',
    city: 'Москва',
    address: 'г. Москва, ул. Центральная, д. 12, кв. 45',
    socialCategory: 'Работающий гражданин',
    status: 'active',
    registrationDate: '2025-01-12',
    snils: '123-456-789 10',
    inn: '770012345678',

    documents: [
      {
        id: 'doc-1-1',
        type: 'Паспорт РФ',
        series: '4512',
        number: '123456',
        issuedAt: '2015-04-20',
        issuedBy: 'ОВМ МВД России по г. Москве',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-1-2',
        type: 'СНИЛС',
        number: '123-456-789 10',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-1-1',
        fullName: 'Иванова Марина Алексеевна',
        relation: 'Супруга',
        birthDate: '1989-08-15',
        livesTogether: true,
        phone: '+7 901 200-20-01',
      },
      {
        id: 'family-1-2',
        fullName: 'Иванов Максим Сергеевич',
        relation: 'Ребенок',
        birthDate: '2016-03-22',
        livesTogether: true,
      },
    ],

    education: {
      level: 'Высшее',
      institution: 'Российский экономический университет',
      specialty: 'Менеджмент',
    },

    employment: {
      status: 'Работает',
      company: 'ООО "Городские сервисы"',
      position: 'Специалист',
      incomeCategory: 'Средний доход',
    },

    employmentHistory: [
      {
        id: 'employment-1-1',
        company: 'АО "Региональный центр"',
        position: 'Оператор',
        period: '2020–2022',
        status: 'Завершено',
      },
      {
        id: 'employment-1-2',
        company: 'ООО "Городские сервисы"',
        position: 'Специалист',
        period: '2022–н.в.',
        status: 'Активно',
      },
    ],
  },
    {
    id: '2',
    fullName: 'Петрова Анна Викторовна',
    birthDate: '1994-09-23',
    gender: 'female',
    phone: '+7 900 100-10-02',
    email: 'petrova.anna@example.ru',
    city: 'Химки',
    address: 'г. Химки, ул. Молодежная, д. 8, кв. 21',
    socialCategory: 'Многодетная семья',
    status: 'pending',
    registrationDate: '2025-02-04',
    snils: '234-567-890 21',
    inn: '500012345679',

    documents: [
      {
        id: 'doc-2-1',
        type: 'Паспорт РФ',
        series: '4601',
        number: '234567',
        issuedAt: '2016-10-14',
        issuedBy: 'ОВМ МВД России по г. Химки',
        verificationStatus: 'pending',
      },
      {
        id: 'doc-2-2',
        type: 'СНИЛС',
        number: '234-567-890 21',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-2-1',
        fullName: 'Петров Виктор Николаевич',
        relation: 'Супруг',
        birthDate: '1991-02-11',
        livesTogether: true,
        phone: '+7 901 200-20-02',
      },
      {
        id: 'family-2-2',
        fullName: 'Петрова Алиса Викторовна',
        relation: 'Ребенок',
        birthDate: '2018-07-19',
        livesTogether: true,
      },
      {
        id: 'family-2-3',
        fullName: 'Петров Артем Викторович',
        relation: 'Ребенок',
        birthDate: '2021-01-05',
        livesTogether: true,
      },
    ],

    education: {
      level: 'Среднее профессиональное',
      institution: 'Московский областной колледж',
      specialty: 'Социальная работа',
    },

    employment: {
      status: 'В отпуске по уходу за ребенком',
      company: 'ГБУ "Социальная поддержка"',
      position: 'Администратор',
      incomeCategory: 'Социальные выплаты',
    },

    employmentHistory: [
      {
        id: 'employment-2-1',
        company: 'ГБУ "Социальная поддержка"',
        position: 'Администратор',
        period: '2019–н.в.',
        status: 'Активно',
      },
    ],
  },

  {
    id: '3',
    fullName: 'Сидоров Михаил Андреевич',
    birthDate: '1978-01-30',
    gender: 'male',
    phone: '+7 900 100-10-03',
    email: 'sidorov.mikhail@example.ru',
    city: 'Санкт-Петербург',
    address: 'г. Санкт-Петербург, Невский проспект, д. 34, кв. 18',
    socialCategory: 'Самозанятый',
    status: 'active',
    registrationDate: '2025-03-18',
    snils: '345-678-901 32',
    inn: '780012345680',

    documents: [
      {
        id: 'doc-3-1',
        type: 'Паспорт РФ',
        series: '4015',
        number: '345678',
        issuedAt: '2018-02-10',
        issuedBy: 'ОВМ МВД России по г. Санкт-Петербургу',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-3-2',
        type: 'ИНН',
        number: '780012345680',
        verificationStatus: 'verified',
      },
    ],

    family: [],

    education: {
      level: 'Высшее',
      institution: 'Санкт-Петербургский государственный университет',
      specialty: 'Экономика',
    },

    employment: {
      status: 'Самозанятый',
      company: 'Самозанятость',
      position: 'Консультант',
      incomeCategory: 'Средний доход',
    },

    employmentHistory: [
      {
        id: 'employment-3-1',
        company: 'ООО "Технопарк"',
        position: 'Менеджер',
        period: '2018–2021',
        status: 'Завершено',
      },
      {
        id: 'employment-3-2',
        company: 'Самозанятость',
        position: 'Консультант',
        period: '2021–н.в.',
        status: 'Активно',
      },
    ],
  },

  {
    id: '4',
    fullName: 'Козлова Екатерина Игоревна',
    birthDate: '2001-06-17',
    gender: 'female',
    phone: '+7 900 100-10-04',
    email: 'kozlova.ekaterina@example.ru',
    city: 'Казань',
    address: 'г. Казань, ул. Баумана, д. 19, кв. 7',
    socialCategory: 'Студент',
    status: 'active',
    registrationDate: '2025-01-28',
    snils: '456-789-012 43',
    inn: '160012345681',

    documents: [
      {
        id: 'doc-4-1',
        type: 'Паспорт РФ',
        series: '9214',
        number: '456789',
        issuedAt: '2021-07-02',
        issuedBy: 'ОВМ МВД России по г. Казани',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-4-2',
        type: 'СНИЛС',
        number: '456-789-012 43',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-4-1',
        fullName: 'Козлова Ирина Павловна',
        relation: 'Мать',
        birthDate: '1976-04-09',
        livesTogether: true,
        phone: '+7 901 200-20-04',
      },
    ],

    education: {
      level: 'Неполное высшее',
      institution: 'Казанский федеральный университет',
      specialty: 'Информационные системы',
    },

    employment: {
      status: 'Обучается',
      company: 'Казанский федеральный университет',
      position: 'Студент',
      incomeCategory: 'Стипендия / поддержка семьи',
    },

    employmentHistory: [],
  },

  {
    id: '5',
    fullName: 'Морозов Дмитрий Олегович',
    birthDate: '1962-11-05',
    gender: 'male',
    phone: '+7 900 100-10-05',
    email: 'morozov.dmitry@example.ru',
    city: 'Краснодар',
    address: 'г. Краснодар, ул. Северная, д. 56, кв. 33',
    socialCategory: 'Пенсионер',
    status: 'archived',
    registrationDate: '2025-04-09',
    snils: '567-890-123 54',
    inn: '230012345682',

    documents: [
      {
        id: 'doc-5-1',
        type: 'Паспорт РФ',
        series: '0312',
        number: '567890',
        issuedAt: '2012-11-20',
        issuedBy: 'ОВМ МВД России по г. Краснодару',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-5-2',
        type: 'СНИЛС',
        number: '567-890-123 54',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-5-1',
        fullName: 'Морозова Татьяна Ивановна',
        relation: 'Супруга',
        birthDate: '1965-02-18',
        livesTogether: true,
        phone: '+7 901 200-20-05',
      },
    ],

    education: {
      level: 'Среднее профессиональное',
      institution: 'Краснодарский технический колледж',
      specialty: 'Эксплуатация оборудования',
    },

    employment: {
      status: 'Пенсионер',
      incomeCategory: 'Пенсионные выплаты',
    },

    employmentHistory: [
      {
        id: 'employment-5-1',
        company: 'АО "Южный завод"',
        position: 'Мастер участка',
        period: '1985–2022',
        status: 'Завершено',
      },
    ],
  },

  {
    id: '6',
    fullName: 'Волкова Мария Сергеевна',
    birthDate: '1990-02-14',
    gender: 'female',
    phone: '+7 900 100-10-06',
    email: 'volkova.maria@example.ru',
    city: 'Екатеринбург',
    address: 'г. Екатеринбург, ул. Малышева, д. 41, кв. 12',
    socialCategory: 'Работающий гражданин',
    status: 'active',
    registrationDate: '2025-05-11',
    snils: '678-901-234 65',
    inn: '660012345683',

    documents: [
      {
        id: 'doc-6-1',
        type: 'Паспорт РФ',
        series: '6510',
        number: '678901',
        issuedAt: '2017-03-04',
        issuedBy: 'ОВМ МВД России по г. Екатеринбургу',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-6-2',
        type: 'ИНН',
        number: '660012345683',
        verificationStatus: 'verified',
      },
    ],

    family: [],

    education: {
      level: 'Высшее',
      institution: 'Уральский федеральный университет',
      specialty: 'Юриспруденция',
    },

    employment: {
      status: 'Работает',
      company: 'ООО "Правовой центр"',
      position: 'Юрист',
      incomeCategory: 'Выше среднего',
    },

    employmentHistory: [
      {
        id: 'employment-6-1',
        company: 'ООО "Консалтинг Плюс"',
        position: 'Помощник юриста',
        period: '2015–2019',
        status: 'Завершено',
      },
      {
        id: 'employment-6-2',
        company: 'ООО "Правовой центр"',
        position: 'Юрист',
        period: '2019–н.в.',
        status: 'Активно',
      },
    ],
  },

  {
    id: '7',
    fullName: 'Федоров Алексей Николаевич',
    birthDate: '1983-08-09',
    gender: 'male',
    phone: '+7 900 100-10-07',
    email: 'fedorov.alexey@example.ru',
    city: 'Новосибирск',
    address: 'г. Новосибирск, Красный проспект, д. 88, кв. 60',
    socialCategory: 'Безработный',
    status: 'pending',
    registrationDate: '2025-06-02',
    snils: '789-012-345 76',
    inn: '540012345684',

    documents: [
      {
        id: 'doc-7-1',
        type: 'Паспорт РФ',
        series: '5016',
        number: '789012',
        issuedAt: '2014-09-13',
        issuedBy: 'ОВМ МВД России по г. Новосибирску',
        verificationStatus: 'pending',
      },
      {
        id: 'doc-7-2',
        type: 'СНИЛС',
        number: '789-012-345 76',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-7-1',
        fullName: 'Федорова Ольга Михайловна',
        relation: 'Супруга',
        birthDate: '1985-12-03',
        livesTogether: true,
        phone: '+7 901 200-20-07',
      },
    ],

    education: {
      level: 'Среднее профессиональное',
      institution: 'Новосибирский колледж связи',
      specialty: 'Компьютерные сети',
    },

    employment: {
      status: 'Не работает',
      incomeCategory: 'Без постоянного дохода',
    },

    employmentHistory: [
      {
        id: 'employment-7-1',
        company: 'ООО "Сибирь-Сервис"',
        position: 'Технический специалист',
        period: '2017–2024',
        status: 'Завершено',
      },
    ],
  },

  {
    id: '8',
    fullName: 'Соколова Ирина Петровна',
    birthDate: '1971-12-21',
    gender: 'female',
    phone: '+7 900 100-10-08',
    email: 'sokolova.irina@example.ru',
    city: 'Ростов-на-Дону',
    address: 'г. Ростов-на-Дону, ул. Пушкинская, д. 22, кв. 14',
    socialCategory: 'Пенсионер',
    status: 'active',
    registrationDate: '2025-02-19',
    snils: '890-123-456 87',
    inn: '610012345685',

    documents: [
      {
        id: 'doc-8-1',
        type: 'Паспорт РФ',
        series: '6018',
        number: '890123',
        issuedAt: '2011-12-28',
        issuedBy: 'ОВМ МВД России по г. Ростову-на-Дону',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-8-2',
        type: 'СНИЛС',
        number: '890-123-456 87',
        verificationStatus: 'verified',
      },
    ],

    family: [],

    education: {
      level: 'Высшее',
      institution: 'Ростовский государственный университет',
      specialty: 'Педагогика',
    },

    employment: {
      status: 'Пенсионер',
      incomeCategory: 'Пенсионные выплаты',
    },

    employmentHistory: [
      {
        id: 'employment-8-1',
        company: 'МБОУ "Школа №17"',
        position: 'Учитель',
        period: '1995–2023',
        status: 'Завершено',
      },
    ],
  },

  {
    id: '9',
    fullName: 'Попов Артем Владимирович',
    birthDate: '1998-03-03',
    gender: 'male',
    phone: '+7 900 100-10-09',
    email: 'popov.artem@example.ru',
    city: 'Самара',
    address: 'г. Самара, ул. Гагарина, д. 9, кв. 101',
    socialCategory: 'Студент',
    status: 'active',
    registrationDate: '2025-03-07',
    snils: '901-234-567 98',
    inn: '630012345686',

    documents: [
      {
        id: 'doc-9-1',
        type: 'Паспорт РФ',
        series: '3618',
        number: '901234',
        issuedAt: '2018-03-15',
        issuedBy: 'ОВМ МВД России по г. Самаре',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-9-2',
        type: 'ИНН',
        number: '630012345686',
        verificationStatus: 'pending',
      },
    ],

    family: [
      {
        id: 'family-9-1',
        fullName: 'Попова Елена Викторовна',
        relation: 'Мать',
        birthDate: '1974-05-14',
        livesTogether: false,
        phone: '+7 901 200-20-09',
      },
    ],

    education: {
      level: 'Неполное высшее',
      institution: 'Самарский университет',
      specialty: 'Прикладная информатика',
    },

    employment: {
      status: 'Обучается',
      company: 'Самарский университет',
      position: 'Студент',
      incomeCategory: 'Стипендия / поддержка семьи',
    },

    employmentHistory: [],
  },

  {
    id: '10',
    fullName: 'Лебедева Ольга Андреевна',
    birthDate: '1989-10-28',
    gender: 'female',
    phone: '+7 900 100-10-10',
    email: 'lebedeva.olga@example.ru',
    city: 'Нижний Новгород',
    address: 'г. Нижний Новгород, ул. Большая Покровская, д. 15, кв. 29',
    socialCategory: 'Многодетная семья',
    status: 'pending',
    registrationDate: '2025-04-22',
    snils: '012-345-678 09',
    inn: '520012345687',

    documents: [
      {
        id: 'doc-10-1',
        type: 'Паспорт РФ',
        series: '2214',
        number: '012345',
        issuedAt: '2019-11-07',
        issuedBy: 'ОВМ МВД России по г. Нижнему Новгороду',
        verificationStatus: 'pending',
      },
      {
        id: 'doc-10-2',
        type: 'СНИЛС',
        number: '012-345-678 09',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-10-1',
        fullName: 'Лебедев Константин Павлович',
        relation: 'Супруг',
        birthDate: '1988-01-19',
        livesTogether: true,
        phone: '+7 901 200-20-10',
      },
      {
        id: 'family-10-2',
        fullName: 'Лебедева София Константиновна',
        relation: 'Ребенок',
        birthDate: '2014-04-30',
        livesTogether: true,
      },
      {
        id: 'family-10-3',
        fullName: 'Лебедев Михаил Константинович',
        relation: 'Ребенок',
        birthDate: '2019-09-12',
        livesTogether: true,
      },
    ],

    education: {
      level: 'Высшее',
      institution: 'Нижегородский государственный университет',
      specialty: 'Бухгалтерский учет',
    },

    employment: {
      status: 'Работает',
      company: 'ООО "Финансовые решения"',
      position: 'Бухгалтер',
      incomeCategory: 'Средний доход',
    },

    employmentHistory: [
      {
        id: 'employment-10-1',
        company: 'ООО "Финансовые решения"',
        position: 'Бухгалтер',
        period: '2016–н.в.',
        status: 'Активно',
      },
    ],
  },

  {
    id: '11',
    fullName: 'Новиков Илья Романович',
    birthDate: '1992-07-19',
    gender: 'male',
    phone: '+7 900 100-10-11',
    email: 'novikov.ilya@example.ru',
    city: 'Воронеж',
    address: 'г. Воронеж, ул. Кольцовская, д. 31, кв. 8',
    socialCategory: 'Работающий гражданин',
    status: 'active',
    registrationDate: '2025-05-14',
    snils: '112-345-678 19',
    inn: '360012345688',

    documents: [
      {
        id: 'doc-11-1',
        type: 'Паспорт РФ',
        series: '2012',
        number: '112345',
        issuedAt: '2016-08-22',
        issuedBy: 'ОВМ МВД России по г. Воронежу',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-11-2',
        type: 'ИНН',
        number: '360012345688',
        verificationStatus: 'verified',
      },
    ],

    family: [],

    education: {
      level: 'Высшее',
      institution: 'Воронежский государственный университет',
      specialty: 'Информационные системы',
    },

    employment: {
      status: 'Работает',
      company: 'ООО "Айти Решения"',
      position: 'Системный аналитик',
      incomeCategory: 'Выше среднего',
    },

    employmentHistory: [
      {
        id: 'employment-11-1',
        company: 'ООО "Сервис Софт"',
        position: 'Специалист поддержки',
        period: '2017–2020',
        status: 'Завершено',
      },
      {
        id: 'employment-11-2',
        company: 'ООО "Айти Решения"',
        position: 'Системный аналитик',
        period: '2020–н.в.',
        status: 'Активно',
      },
    ],
  },

  {
    id: '12',
    fullName: 'Михайлова Дарья Евгеньевна',
    birthDate: '2003-05-07',
    gender: 'female',
    phone: '+7 900 100-10-12',
    email: 'mikhailova.darya@example.ru',
    city: 'Пермь',
    address: 'г. Пермь, Комсомольский проспект, д. 44, кв. 13',
    socialCategory: 'Студент',
    status: 'active',
    registrationDate: '2025-06-25',
    snils: '223-456-789 20',
    inn: '590012345689',

    documents: [
      {
        id: 'doc-12-1',
        type: 'Паспорт РФ',
        series: '5719',
        number: '223456',
        issuedAt: '2023-05-21',
        issuedBy: 'ОВМ МВД России по г. Перми',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-12-2',
        type: 'СНИЛС',
        number: '223-456-789 20',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-12-1',
        fullName: 'Михайлова Светлана Олеговна',
        relation: 'Мать',
        birthDate: '1979-03-27',
        livesTogether: true,
        phone: '+7 901 200-20-12',
      },
    ],

    education: {
      level: 'Неполное высшее',
      institution: 'Пермский государственный университет',
      specialty: 'Психология',
    },

    employment: {
      status: 'Обучается',
      company: 'Пермский государственный университет',
      position: 'Студент',
      incomeCategory: 'Стипендия / поддержка семьи',
    },

    employmentHistory: [],
  },

  {
    id: '13',
    fullName: 'Кузьмин Андрей Львович',
    birthDate: '1980-09-11',
    gender: 'male',
    phone: '+7 900 100-10-13',
    email: 'kuzmin.andrey@example.ru',
    city: 'Челябинск',
    address: 'г. Челябинск, проспект Ленина, д. 72, кв. 41',
    socialCategory: 'Самозанятый',
    status: 'archived',
    registrationDate: '2025-01-30',
    snils: '334-567-890 31',
    inn: '740012345690',

    documents: [
      {
        id: 'doc-13-1',
        type: 'Паспорт РФ',
        series: '7503',
        number: '334567',
        issuedAt: '2015-09-18',
        issuedBy: 'ОВМ МВД России по г. Челябинску',
        verificationStatus: 'rejected',
      },
      {
        id: 'doc-13-2',
        type: 'ИНН',
        number: '740012345690',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-13-1',
        fullName: 'Кузьмина Наталья Игоревна',
        relation: 'Супруга',
        birthDate: '1982-06-04',
        livesTogether: true,
        phone: '+7 901 200-20-13',
      },
    ],

    education: {
      level: 'Среднее профессиональное',
      institution: 'Челябинский промышленный колледж',
      specialty: 'Техническое обслуживание',
    },

    employment: {
      status: 'Самозанятый',
      company: 'Самозанятость',
      position: 'Мастер по ремонту',
      incomeCategory: 'Нестабильный доход',
    },

    employmentHistory: [
      {
        id: 'employment-13-1',
        company: 'ООО "РемСервис"',
        position: 'Мастер',
        period: '2010–2020',
        status: 'Завершено',
      },
      {
        id: 'employment-13-2',
        company: 'Самозанятость',
        position: 'Мастер по ремонту',
        period: '2020–н.в.',
        status: 'Активно',
      },
    ],
  },

  {
    id: '14',
    fullName: 'Зайцева Полина Максимовна',
    birthDate: '1996-01-25',
    gender: 'female',
    phone: '+7 900 100-10-14',
    email: 'zaytseva.polina@example.ru',
    city: 'Уфа',
    address: 'г. Уфа, ул. Ленина, д. 18, кв. 53',
    socialCategory: 'Работающий гражданин',
    status: 'active',
    registrationDate: '2025-03-29',
    snils: '445-678-901 42',
    inn: '020012345691',

    documents: [
      {
        id: 'doc-14-1',
        type: 'Паспорт РФ',
        series: '8016',
        number: '445678',
        issuedAt: '2016-02-10',
        issuedBy: 'ОВМ МВД России по г. Уфе',
        verificationStatus: 'verified',
      },
      {
        id: 'doc-14-2',
        type: 'СНИЛС',
        number: '445-678-901 42',
        verificationStatus: 'verified',
      },
    ],

    family: [],

    education: {
      level: 'Высшее',
      institution: 'Башкирский государственный университет',
      specialty: 'Маркетинг',
    },

    employment: {
      status: 'Работает',
      company: 'ООО "Медиа Групп"',
      position: 'Маркетолог',
      incomeCategory: 'Средний доход',
    },

    employmentHistory: [
      {
        id: 'employment-14-1',
        company: 'ООО "Рекламные технологии"',
        position: 'Ассистент маркетолога',
        period: '2018–2021',
        status: 'Завершено',
      },
      {
        id: 'employment-14-2',
        company: 'ООО "Медиа Групп"',
        position: 'Маркетолог',
        period: '2021–н.в.',
        status: 'Активно',
      },
    ],
  },

  {
    id: '15',
    fullName: 'Павлов Никита Денисович',
    birthDate: '1975-06-02',
    gender: 'male',
    phone: '+7 900 100-10-15',
    email: 'pavlov.nikita@example.ru',
    city: 'Красноярск',
    address: 'г. Красноярск, ул. Мира, д. 67, кв. 25',
    socialCategory: 'Безработный',
    status: 'pending',
    registrationDate: '2025-05-05',
    snils: '556-789-012 53',
    inn: '240012345692',

    documents: [
      {
        id: 'doc-15-1',
        type: 'Паспорт РФ',
        series: '0411',
        number: '556789',
        issuedAt: '2013-06-19',
        issuedBy: 'ОВМ МВД России по г. Красноярску',
        verificationStatus: 'pending',
      },
      {
        id: 'doc-15-2',
        type: 'СНИЛС',
        number: '556-789-012 53',
        verificationStatus: 'verified',
      },
    ],

    family: [
      {
        id: 'family-15-1',
        fullName: 'Павлова Елена Андреевна',
        relation: 'Сестра',
        birthDate: '1981-09-09',
        livesTogether: false,
        phone: '+7 901 200-20-15',
      },
    ],

    education: {
      level: 'Среднее профессиональное',
      institution: 'Красноярский строительный техникум',
      specialty: 'Строительство и эксплуатация зданий',
    },

    employment: {
      status: 'Не работает',
      incomeCategory: 'Без постоянного дохода',
    },

    employmentHistory: [
      {
        id: 'employment-15-1',
        company: 'ООО "СтройМонтаж"',
        position: 'Прораб',
        period: '2008–2024',
        status: 'Завершено',
      },
    ],
  },
]