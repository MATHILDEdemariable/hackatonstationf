-- Fix search_path for calculate_age function
create or replace function public.calculate_age()
returns trigger 
language plpgsql
security definer
set search_path = public
as $$
begin
  new.age := extract(year from age(new.birth_date));
  return new;
end;
$$;