import type { Theme } from '@/types'
import {All_Themes} from '../../themes/index'
import { useState } from 'react'
import { ThemeCard } from '../components/ui'


export function ConfigView() {
    const [themes, setTheme] = useState<Record<string, Theme>>()
    All_Themes.then((data) => {
        console.log(data)
        setTheme(data)
    }).catch((e) => {
        console.log("ERROR: Erro ao carregar os temas: " + e)
    })

    return (
        <div className="bg-(--bg)">
            <header>
                <h2 className="text-2xl bg-(--bg)  ">
                    Configurações
                </h2>
            </header>
            <section>
                {themes ?
                    <ThemeCard themes={Object.values(themes)}></ThemeCard>
                    : (<div>Não há temas</div>)
                }
            </section>

        </div>
    )
}

