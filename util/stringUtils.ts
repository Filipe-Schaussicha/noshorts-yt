
export default function insertDotsNumber(num: string){
    let num_number = 0;
    try {
        num_number = Number(num)
    } catch (error) {
        console.error(error)
        return '0'
    }

    let saida = ''
    if(num_number > 1000000){
        saida = (num_number / 1000000).toFixed(1) + ' M'
    }else if(num_number > 1000){
        saida = (num_number / 1000).toFixed(1) + ' k'
    }else{
        saida = num_number.toString()
    }

    return saida;
}