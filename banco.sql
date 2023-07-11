create table categorias (
   codigo serial not null primary key, 
   nome varchar (40) not null
);

create table produtos (
   codigo serial not null primary key, 
   nome varchar (50) not null,
   descricao text, 
   quantidade_estoque integer,
   check (quantidade_estoque >= 0),
   ativo boolean not null, 
   valor numeric(12,2) not null, 
   check (valor >= 0),
   data_cadastro date not null, 
   categoria integer not null, 
   foreign key (categoria) references categorias (codigo)
);

create table avaliacoes (
 	 codigo serial not null primary key, 
	 autor varchar(40) not null, 
	email varchar(40) not null, 
	texto varchar(200) not null, 
	nota integer not null, 
	check (nota >= 0 and nota <= 5),
	data date not null,
	produto integer not null, 
	foreign key (produto) references produtos (codigo)
);

-- inserindo registros
-- categorias 
insert into categorias (nome) values ('Eletrônicos') , ('Eletrodomésticos') , ('Informática');

-- produtos

insert into produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
values ('Mouse USB','Mouse USB', 20, true, 60.0, current_date,1), 
('Mouse Sem FIO','Mouse sem fio', 10, true, 120.0, current_date,1),
('Teclado USB','Teclado USB', 30, true, 500.0, current_date,1);

-- avaliações
insert into avaliacoes (autor, email, texto, nota, data, produto) 
values  ('Jorge', 'jorgebavaresco@ifsul.edu.br','Mouse muito preciso', 5, current_date, 1);

select * from avaliacoes;